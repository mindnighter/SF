import { createElement } from '../../helpers/domHelper';
export function showWinnerModal(fighter) {
  const root = document.getElementById("root");
  root.removeChild(root.firstChild);
  const fighterElement = createElement({
    tagName: 'div',
    className: 'fighter-winner',
  });
  root.append(fighterElement);
  const imageElement = createFighterImage(fighter);
  fighterElement.append(imageElement);
}

 function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}