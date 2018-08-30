import Injector from 'lib/Injector';
import ManualCropField from 'components/ManualCropField';

const registerComponents = () => {
  Injector.component.register('ManualCropField', ManualCropField);
};

export default registerComponents;
