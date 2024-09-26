export const ATTRIBUTE_LIST = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma',
]

export const MAX_ATTRIBUTES = 70

export const CLASS_LIST = {
  Barbarian: {
    Strength: 14,
    Dexterity: 9,
    Constitution: 9,
    Intelligence: 9,
    Wisdom: 9,
    Charisma: 9,
  },
  Wizard: {
    Strength: 9,
    Dexterity: 9,
    Constitution: 9,
    Intelligence: 14,
    Wisdom: 9,
    Charisma: 9,
  },
  Bard: {
    Strength: 9,
    Dexterity: 9,
    Constitution: 9,
    Intelligence: 9,
    Wisdom: 9,
    Charisma: 14,
  },
}

export const SKILLS_MAP = {
  Acrobatics: { attributeModifier: 'Dexterity' },
  'Animal Handling': { attributeModifier: 'Wisdom' },
  Arcana: { attributeModifier: 'Intelligence' },
  Athletics: { attributeModifier: 'Strength' },
  Deception: { attributeModifier: 'Charisma' },
  History: { attributeModifier: 'Intelligence' },
  Insight: { attributeModifier: 'Wisdom' },
  Intimidation: { attributeModifier: 'Charisma' },
  Investigation: { attributeModifier: 'Intelligence' },
  Medicine: { attributeModifier: 'Wisdom' },
  Nature: { attributeModifier: 'Intelligence' },
  Perception: { attributeModifier: 'Wisdom' },
  Performance: { attributeModifier: 'Charisma' },
  Persuasion: { attributeModifier: 'Charisma' },
  Religion: { attributeModifier: 'Intelligence' },
  'Sleight of Hand': { attributeModifier: 'Dexterity' },
  Stealth: { attributeModifier: 'Dexterity' },
  Survival: { attributeModifier: 'Wisdom' },
}

export const DEFAULT_CHARACTER = {
  Id: 0,
  Name: '',

  Class: null,

  Attributes: {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  },

  Skills: {
    Acrobatics: 0,
    'Animal Handling': 0,
    Arcana: 0,
    Athletics: 0,
    Deception: 0,
    History: 0,
    Insight: 0,
    Intimidation: 0,
    Investigation: 0,
    Medicine: 0,
    Nature: 0,
    Perception: 0,
    Performance: 0,
    Persuasion: 0,
    Religion: 0,
    'Sleight of Hand': 0,
    Stealth: 0,
    Survival: 0,
  },
}

export const ENDPOINT =
  'https://recruiting.verylongdomaintotestwith.ca/api/%7B%7Brvanoni%7D%7D/character'