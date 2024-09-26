import { useState, useEffect } from 'react'

import { styled } from 'styled-components'

import './App.css'
import { DEFAULT_CHARACTER, ENDPOINT } from './consts.js'
import CharacterSheet from './components/CharacterSheet'
import Button, { DangerButton, PrimaryButton } from './components/Button.js'

const Section = styled.div`
  flex: 1 1 0;
  background-color: hsl(220deg 13% 13%);
  color: white;
  padding: 16px;
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  gap: 12px;
`

function App() {
  const [characters, setCharacters] = useState([])

  const handleAddNewCharacter = () => {
    const name = prompt("Enter the character's name:")
    if (!name?.length) return

    const newCharacter = {
      ...DEFAULT_CHARACTER,
      Id: characters.length + 1,
      Name: name,
    }
    setCharacters([...characters, newCharacter])
  }

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(ENDPOINT, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch characters')
        }

        const data = await response.json()
        if (data?.body) setCharacters(data.body)
      } catch (error) {
        console.error('Error fetching characters:', error)
      }
    }

    fetchCharacters()
  }, [])

  const handleSaveCharacters = async (chars) => {
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chars),
      })

      if (!response.ok) {
        throw new Error('Failed to save characters')
      }

      alert(`Characters saved successfully`)
    } catch (error) {
      console.error('Error saving characters:', error)
      alert('Failed to save characters')
    }
  }

  const handleEraseAllCharacters = () => {
    setCharacters([])
    handleSaveCharacters([])
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Coding Exercise</h1>
      </header>
      <Section>
        <ButtonGroup>
          <PrimaryButton onClick={handleAddNewCharacter}>
            Add new character
          </PrimaryButton>
          <DangerButton onClick={handleEraseAllCharacters}>
            Erase all characters
          </DangerButton>
          <Button onClick={() => handleSaveCharacters(characters)}>
            Save characters
          </Button>
        </ButtonGroup>

        {characters.map((character) => (
          <CharacterSheet
            key={character.Id}
            character={character}
            onDelete={() =>
              setCharacters(characters.filter((c) => c.Id !== character.Id))
            }
            onUpdate={(field, value) =>
              setCharacters(
                characters.map((c) =>
                  c.Id === character.Id
                    ? {
                        ...c,
                        ...(field in c.Attributes
                          ? { Attributes: { ...c.Attributes, [field]: value } }
                          : {}),
                        ...(field in c.Skills
                          ? { Skills: { ...c.Skills, [field]: value } }
                          : {}),
                        ...(field === 'Class' ? { Class: value } : {}),
                      }
                    : c
                )
              )
            }
          />
        ))}
      </Section>
    </div>
  )
}

export default App
