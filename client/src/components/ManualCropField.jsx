import React, { PropTypes, Component, Children, cloneElement } from 'react';
import { inject } from 'lib/Injector';
import classNames from 'classnames';
import Cropper from 'react-cropper';
//import 'cropperjs/dist/cropper.css';

class ManualCropField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ManualCropData: props.data ? props.data.ManualCropData : {}
    };
  }

  _crop() {}

  _cropend() {

    const {children, onAutofill, name} = this.props;

    //save data to child field
    var child = children[0];//save field
    var cropdata = this.refs.cropper.getData();
    var save = {
      x : cropdata.x ? Math.round(cropdata.x) : 0,
      y : cropdata.y ? Math.round(cropdata.y) : 0,
      width : cropdata.width ? Math.round(cropdata.width) : 0,
      height : cropdata.height ? Math.round(cropdata.height) : 0,
      rotate : cropdata.rotate ? Math.round(cropdata.rotate) : 0,
      scaleX : cropdata.scaleX ? Math.round(cropdata.scaleX) : 0,
      scaleY : cropdata.scaleY ? Math.round(cropdata.scaleY) : 0,
    };

    onAutofill(child.props.name, JSON.stringify(save));

    this.setState({
      ManualCropData : save
    });

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.ManualCropData.x == this.state.ManualCropData.x
          && nextState.ManualCropData.y == this.state.ManualCropData.y
          && nextState.ManualCropData.width == this.state.ManualCropData.width
          && nextState.ManualCropData.height == this.state.ManualCropData.height
    ) {
      return false;
    }
  }

  renderChildren(children) {
    return (children);
  }

  render() {

    const {children, data} = this.props;

    var manual_crop_data = {};
    if(this.state && 'ManualCropData' in this.state) {
      manual_crop_data = this.state.ManualCropData;
    } else if('ManualCropData' in data) {
      manual_crop_data = data.ManualCropData;
    }

    var image_url = '';
    if(this.state && 'ImageURL' in this.state) {
      image_url = this.state.ImageURL;
    } else if('ImageURL' in data) {
      image_url = data.ImageURL;
    }

    return (
      <div data-cropper="1">
      <Cropper
        ref='cropper'
        src={image_url}
        style={{height: 'auto', width: '100%'}}
        // Cropper.js options
        minContainerWidth={400}
        minContainerHeight={300}
        aspectRatio={NaN}
        guides={true}
        viewMode={2}
        dragMode='crop'
        autoCrop={true}
        movable={true}
        rotatable={false}
        scalable={true}
        zoomable={false}
        zoomOnTouch={false}
        zoomOnWheel={false}
        checkOrientation={false}
        autoCropArea={0.5}
        data={manual_crop_data}
        cropend={this._cropend.bind(this)}
        crop={this._crop.bind(this)} />
        {this.renderChildren(children)}
      </div>
    );
  }
}

ManualCropField.defaultProps = {};

ManualCropField.propTypes = {
  children: PropTypes.array,
  onAutofill: PropTypes.func,
  FieldGroup: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export { ManualCropField as Component };

export default inject(['FieldGroup'])(ManualCropField);
