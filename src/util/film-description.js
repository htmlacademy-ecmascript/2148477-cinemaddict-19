const PREVIEW_FILM_DESCRIPTION_LENGTH = 140;

function getPreviewFilmDescription(fullFilmDescription) {

  if (fullFilmDescription.length > PREVIEW_FILM_DESCRIPTION_LENGTH) {
    const previewFilmDescription = fullFilmDescription.slice(0, PREVIEW_FILM_DESCRIPTION_LENGTH);
    const lastSpaceIndex = previewFilmDescription.lastIndexOf(' ');

    return `${previewFilmDescription.slice(0, lastSpaceIndex)} ...`;
  }

  return fullFilmDescription;
}

export {getPreviewFilmDescription};
