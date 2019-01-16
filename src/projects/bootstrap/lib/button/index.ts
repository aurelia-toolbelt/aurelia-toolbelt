import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { AtButton } from './abt-button';
import { AtToolbar } from './abt-toolbar';
import { AtRadioButton } from './abt-radio-button';
import { AtCheckboxButton } from './abt-checkbox-button';
import { AtButtonGroup } from './abt-button-group';

// export * from './abt-button';
// export * from './abt-toolbar';
// export * from './abt-button-group';
// export * from './abt-link-button';

export function configure(config: FrameworkConfiguration) {

  config.globalResources([
    AtButton,
    AtToolbar,
    AtButtonGroup,
    AtRadioButton,
    AtCheckboxButton,
  ]);

}
