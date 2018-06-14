import React, {PropTypes, Component, cloneElement} from 'react';
//import classNames from 'classnames';
import Cropper from 'react-cropper';
//import 'cropperjs/dist/cropper.css';

class ManualCropField extends Component {
  _crop(){
    // image in dataUrl
    console.log(this.refs.cropper.getCropBoxData());
    this.state.cropdata = this.refs.cropper.getCropBoxData();
  }

  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      cropdata: props.data ? props.data.cropdata : {},
    };
    //this.handleFocusChange = this.handleFocusChange.bind(this);
  }

  render() {

    const {showDebug, tooltip, imageSrc,} = this.props.data;

    return (
      <Cropper
        ref='cropper'
        src='https://ss4test.dpcdev/assets/testing/1967508e23/403H_resized.jpg'
        style={{height: 400, width: '100%'}}
        // Cropper.js options
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
        data={{}}
        crop={this._crop.bind(this)} />
    );
  }
}

ManualCropField.defaultProps = {};

export default ManualCropField;
