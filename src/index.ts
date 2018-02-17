
// import { Controller } from 'aurelia-templating';
// import { TaskQueue } from 'aurelia-task-queue';
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './services/bootstrap/bootstrap-typography-service';

export * from './services/jquery/toastr/toastr-service-options';
export * from './services/jquery/toastr/toastr-service';

export * from './services/misc/common-css-service';

// export * from './services/vanilla/zenscroll/zenscroll-service';


export function configure(config: FrameworkConfiguration) {

  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/binding-behaviours/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/services/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/utilities/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/index'))
    ;

  config.plugin(PLATFORM.moduleName('aurelia-after-attached-plugin'));

  // let taskQueue = config.aurelia.container.get(TaskQueue);

  // // intercept attached() calls of the View so we can call afterAttached() afterwards
  // let attached = Controller.prototype.attached;
  // Controller.prototype.attached = () => {
  //   // attached() gets called twice but only does things when isAttached is false
  //   let isAttached = this.isAttached;
  //   attached.call(this);

  //   // call afterAttached() only if the View has not been attached before
  //   if (!isAttached) {
  //     if (this.viewModel && this.viewModel.afterAttached) {
  //       // call afterAttached() via the taskqueue, so any two-way bindings have been completed
  //       taskQueue.queueTask(() => this.viewModel.afterAttached());
  //     }
  //   }
  // };

}
