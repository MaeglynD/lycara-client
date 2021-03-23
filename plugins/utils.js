/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */

export default (context, inject) => {
  /**
  * A wrapper that is used for all api requests
  * @param { function } attempt - function invoked in try block
  * @param { function } onError - function invoked on error
  * @param { string } successSnack - a string shown in the success snackbar.
  * @param { string } failureSnack - a string shown in the failure snackbar.
  */
  inject('requestWrapper', async (attempt, onError, successSnack, failureSnack) => {
    try {
      await attempt();

      // If theres any string to show in the sucess snackbar...
      if (successSnack) {
        // Invoke the success snackbar
        $nuxt.$emit(
          'openSnackbar',
          successSnack,
          '#2b9263',
        );
      }
    } catch (err) {
      // Invoke onError function
      await onError(err);

      // Login failed, show in snackbar
      $nuxt.$emit(
        'openSnackbar',
        // If theres no given snackbar error, user the given err
        failureSnack || err,
        '#ff6161',
      );
    }
  });
};
