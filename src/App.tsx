import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [selection, setSelection] = useState<Selection | null>(null)

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = document.getSelection()

      if (selection) {
        setSelection({
          anchor: {
            node: getNodePath(selection.anchorNode) || '',
            offset: selection.anchorOffset,
          },
          focus: {
            node: getNodePath(selection.focusNode) || '',
            offset: selection.focusOffset,
          },
        })
      }
    }

    document.addEventListener('selectionchange', handleSelectionChange)

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [])

  return (
    <div className="content">
      <h1>Test Heading</h1>
      <p>This is a paragraph of text to test the site.</p>
      <p>Here is another paragraph with more information.</p>
      <p>Feel free to add more content as needed.</p>
      <h1>Selection</h1>
      <pre>{JSON.stringify(selection, null, 2)}</pre>
    </div>
  )
}

function getNodePath(node: Node | null): string {
  if (!node) return ''

  if (node.nodeName === 'BODY') return 'BODY'

  const parentPath = getNodePath(node.parentNode)

  if (!parentPath) return node.nodeName

  return parentPath + ' > ' + node.nodeName
}

interface Selection {
  anchor: Location
  focus: Location
}

interface Location {
  node: string
  offset: number
}

export default App
