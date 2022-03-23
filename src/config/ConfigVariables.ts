import { ConfigVariable } from './index';

interface ConfigVariables {
  [ConfigVariable.PORT]: number;
  [ConfigVariable.WEB3_HTTP_ENDPOINT]: string;
}

export default ConfigVariables;
