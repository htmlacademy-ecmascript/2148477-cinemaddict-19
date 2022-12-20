const PREVIEW_DESCRIPTION_LENGTH = 140;

function getPreviewFilmDescription(fullDescription) {

  if (fullDescription.length > PREVIEW_DESCRIPTION_LENGTH) {
    const previewFilmDescription = fullDescription.slice(0, PREVIEW_DESCRIPTION_LENGTH + 1);
    const lastSpaceIndex = previewFilmDescription.lastIndexOf(' ');

    return `${previewFilmDescription.slice(0, lastSpaceIndex)} ...`;
  }

  return fullDescription;
}

export {getPreviewFilmDescription};
