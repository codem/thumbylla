import React, { PropTypes, Component, Children, cloneElement } from 'react';
import { inject } from 'lib/Injector';
import classNames from 'classnames';
import Cropper from 'react-cropper';
//import 'cropperjs/dist/cropper.css';

class ManualCropField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ManualCropData: props.data ? props.data.ManualCropData : '',
      ImageURL: props.data ? props.data.ImageURL : '',
    };
  }

  _crop() {

    const {FieldGroup, children, onAutofill, name} = this.props;

    var child = children[0];//save field
    var cropdata = this.refs.cropper.getData();
    var save = {
      width : cropdata.width ? Math.round(cropdata.width) : 0,
      height : cropdata.height ? Math.round(cropdata.height) : 0,
      x : cropdata.x ? Math.round(cropdata.x) : 0,
      y : cropdata.y ? Math.round(cropdata.y) : 0,
      rotate : cropdata.rotate ? Math.round(cropdata.rotate) : 0,
      scaleX : cropdata.scaleX ? Math.round(cropdata.scaleX) : 0,
      scaleY : cropdata.scaleY ? Math.round(cropdata.scaleY) : 0,
    };
    var savedata = JSON.stringify(save);
    onAutofill(child.props.name, savedata);

  }

  renderChildren(children) {
    return (children);
  }

  render() {

    const {FieldGroup, children} = this.props;
    const {ImageURL, ManualCropData} = this.state;

    var cropdata = {};
    try {
      cropdata = JSON.parse(ManualCropData);
    } catch (e) {
      console.log('B.A.D JSON');
    }

    return (
      <div data-cropper="1">
      <Cropper
        ref='cropper'
        src={ImageURL}
        style={{height: 'auto', width: '100%'}}
        // Cropper.js options
        minContainerWidth={400}
        minContainerHeight={300}
        aspectRatio={NaN}
        guides={false}
        viewMode={1}
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
        data={cropdata}
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
