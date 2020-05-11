import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  
  if(fighter){
    const imageElement = createFighterImage(fighter);
    fighterElement.append(imageElement);
    fighterElement.append(`${fighter.name}   \n` );
    fighterElement.append(`Health - ${fighter.health} \n`);
    fighterElement.append(`Attack - ${fighter.attack} \n`);
    fighterElement.append(`Defense -${fighter.defense}\n`);
    }
  return fighterElement;
}

export function createFighterImage(fighter) {
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
