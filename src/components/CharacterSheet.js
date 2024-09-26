import { styled } from 'styled-components'
import { CLASS_LIST, MAX_ATTRIBUTES, SKILLS_MAP } from '../consts'
import Button, { SecondaryButton } from './Button'

const Wrapper = styled.div`
  border: 1px solid white;
  position: relative;
  margin-bottom: 24px;
  border-radius: 12px;
  padding: 16px;
`

const Label = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 10px;
  color: #c9c9c9;
`

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 10px;
`

const Section = styled.div`
  flex: 1;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  padding-bottom: 12px;
`

const ClassButton = styled.button`
  background-color: ${({ currentClass }) =>
    currentClass ? 'lightgreen' : '#c9c9c9'};
  color: black;
  width: 100%;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &[disabled] {
    background-color: #6b7280;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #8b9467;
  }

  &:hover > div {
    display: block;
    color: white;
  }
`

const RequirementsDiv = styled.div`
  display: none;
  position: absolute;
  bottom: 100%;
  left: 0;
  background-color: #6b7280;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 8px;
  text-align: left;
`

const calculateAllowedClasses = (character) => {
  const allowedClasses = {}
  Object.keys(CLASS_LIST).forEach((classEl) => {
    let requirementsMet = true
    Object.keys(CLASS_LIST[classEl]).forEach((attr) => {
      if (character.Attributes[attr] < CLASS_LIST[classEl][attr]) {
        requirementsMet = false
        return
      }
    })

    if (requirementsMet) allowedClasses[classEl] = true
  })

  return allowedClasses
}

function CharacterSheet({ character, onDelete, onUpdate }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this character?'))
      onDelete()
  }

  const allowedClasses = calculateAllowedClasses(character)

  const remainingAttributes =
    MAX_ATTRIBUTES -
    Object.keys(character.Attributes).reduce(
      (acc, key) => acc + character.Attributes[key],
      0
    )

  const calculateAbilityModifier = (attributeValue) => {
    return Math.floor((attributeValue - 10) / 2)
  }

  const calculateTotalSkillValue = (skillName) => {
    const attributeModifier = SKILLS_MAP[skillName].attributeModifier
    const attributeValue = character.Attributes[attributeModifier]
    const skillPoints = character.Skills[skillName]
    return calculateAbilityModifier(attributeValue) + skillPoints
  }

  const usedSkills = Object.keys(character.Skills).reduce(
    (acc, key) => acc + character.Skills[key],
    0
  )
  const remainingSkills =
    10 + 4 * character.Attributes.Intelligence - usedSkills

  return (
    <Wrapper>
      <Label>Character #{character.Id}</Label>
      <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      <h2>{character.Name}</h2>
      <h3>Class: {character.Class || 'None'}</h3>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        <Section>
          <h4 style={{ marginBottom: '4px' }}>Attributes</h4>
          <h6 style={{ marginTop: '4px', color: '#c9c9c9' }}>
            Remaining: {remainingAttributes}
          </h6>
          {Object.keys(character.Attributes).map((attr) => (
            <div
              key={attr}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '70%',
                margin: 'auto',
                marginBottom: '8px',
              }}
            >
              <div>
                <div>
                  {attr}: {character.Attributes[attr]}
                </div>
                <div style={{ marginTop: '4px', fontSize: '12px' }}>
                  Modifier:{' '}
                  {calculateAbilityModifier(character.Attributes[attr])}
                </div>
              </div>
              <div>
                <Button
                  small
                  onClick={() => onUpdate(attr, character.Attributes[attr] + 1)}
                  style={{ marginRight: '4px' }}
                  disabled={remainingAttributes === 0}
                >
                  +
                </Button>
                <SecondaryButton
                  small
                  onClick={() => onUpdate(attr, character.Attributes[attr] - 1)}
                  disabled={character.Attributes[attr] === 0}
                >
                  -
                </SecondaryButton>
              </div>
            </div>
          ))}
        </Section>
        <Section>
          <h4>Choose your Class</h4>
          {Object.keys(CLASS_LIST).map((classKey) => (
            <div
              key={classKey}
              style={{ margin: 'auto', marginBottom: '8px', width: '50%' }}
            >
              <ClassButton
                disabled={!allowedClasses[classKey]}
                onClick={() => onUpdate('Class', classKey)}
                currentClass={character.Class === classKey}
              >
                <b>{classKey}</b>
                {!allowedClasses[classKey] && (
                  <>
                    <i>Requirements not met</i>
                    <RequirementsDiv>
                      <b>Requirements:</b>
                      <ul
                        style={{
                          listStyleType: 'none',
                          paddingLeft: '16px',
                          marginTop: '4px',
                        }}
                      >
                        {Object.keys(CLASS_LIST[classKey]).map((attr) => (
                          <li
                            key={`${classKey}_${attr}`}
                            style={{
                              color:
                                CLASS_LIST[classKey][attr] >
                                character.Attributes[attr]
                                  ? 'lightcoral'
                                  : 'lightgreen',
                            }}
                          >
                            {attr}: {CLASS_LIST[classKey][attr]}
                          </li>
                        ))}
                      </ul>
                    </RequirementsDiv>
                  </>
                )}
              </ClassButton>
            </div>
          ))}
        </Section>
        <Section>
          <h4 style={{ marginBottom: '4px' }}>Skills</h4>
          <h6
            style={{
              marginTop: '4px',
              color: remainingSkills < 0 ? 'red' : '#c9c9c9',
            }}
          >
            Remaining: {remainingSkills}
          </h6>
          {Object.keys(character.Skills).map((skill) => (
            <div
              key={skill}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '70%',
                margin: 'auto',
                marginBottom: '8px',
                textAlign: 'left',
              }}
            >
              <div>
                <div>
                  {skill}: {calculateTotalSkillValue(skill)}
                </div>
                <div style={{ marginTop: '4px', fontSize: '12px' }}>
                  Modifier: {SKILLS_MAP[skill].attributeModifier} (
                  {calculateAbilityModifier(
                    character.Attributes[SKILLS_MAP[skill].attributeModifier]
                  )}
                  )
                </div>
                <div style={{ marginTop: '4px', fontSize: '12px' }}>
                  Skill points: {character.Skills[skill]}
                </div>
              </div>
              <div>
                <Button
                  small
                  onClick={() => onUpdate(skill, character.Skills[skill] + 1)}
                  style={{ marginRight: '4px' }}
                  disabled={remainingSkills <= 0}
                >
                  +
                </Button>
                <SecondaryButton
                  small
                  onClick={() => onUpdate(skill, character.Skills[skill] - 1)}
                >
                  -
                </SecondaryButton>
              </div>
            </div>
          ))}
        </Section>
      </div>
    </Wrapper>
  )
}

export default CharacterSheet
