const getId = (url) => {
  const reglaUrl =
    /^(?:(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11}))/i;
  const match = url.match(reglaUrl);
  return match;
};

export default getId;
