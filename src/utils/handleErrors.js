export const handleError = (error) => {
  if (error.response && error.response.data.message) {
    window.alert(error.response.data.message);
  }
}