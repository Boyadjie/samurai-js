
  function getNameTag(id) {
    let nameTag = $(`#${id}`).value;
    console.log(nameTag);
    return nameTag;
  }

  export { getNameTag } from 'functions.js'