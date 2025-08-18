import { useEffect, useMemo, useState } from 'react'
import { Tree } from 'primereact/tree'
import type { TreeNode } from 'primereact/treenode'
import { Card } from 'primereact/card'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Toast } from 'primereact/toast'
import { useRef } from 'react'
import YAML from 'yaml'

// Types that reflect our YAML structure
export interface PersonNode {
  name: string
  isSpouse?: boolean
  isNote?: boolean
  generation?: number
  birthYear?: number | null
  deathYear?: number | null
  children?: PersonNode[]
}

export interface FamilyYaml {
  title: string
  children: PersonNode[]
}

function formatYears(b?: number | null, d?: number | null) {
  const toStr = (v?: number | null) => (v === null || v === undefined ? '?' : String(v))
  if (b == null && d == null) return ''
  return ` (${toStr(b)} - ${toStr(d)})`
}

function toTreeNodes(nodes: PersonNode[] | undefined): TreeNode[] {
  if (!nodes) return []
  return nodes.map((n, idx) => {
    const label = `${n.name}${formatYears(n.birthYear, n.deathYear)}`
    const className = n.isNote ? 'p-text-secondary' : n.isSpouse ? 'spouse-node' : ''
    const icon = n.isNote ? 'pi pi-info-circle' : n.isSpouse ? 'pi pi-heart' : 'pi pi-user'
    return {
      key: `${n.name}-${idx}`,
      label,
      icon,
      className,
      children: toTreeNodes(n.children),
    } as TreeNode
  })
}

export default function FamilyTree() {
  const [, setYamlText] = useState<string>('')
  const [data, setData] = useState<FamilyYaml | null>(null)
  const [loading, setLoading] = useState(false)
  const toastRef = useRef<Toast>(null)

  useEffect(() => {
    // Load default YAML on first mount
    loadDefault()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadDefault() {
    try {
      setLoading(true)
      // Resolve the YAML file as an asset URL and fetch its contents at runtime.
      const url = new URL('../../data/teneyck-tree.yaml', import.meta.url)
      const res = await fetch(url.href)
      if (!res.ok) throw new Error(`Failed to fetch YAML: ${res.status} ${res.statusText}`)
      const text = await res.text()
      setYamlText(text)
      const parsed = YAML.parse(text) as FamilyYaml
      setData(parsed)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to load YAML'
      console.error(e)
      toastRef.current?.show({ severity: 'error', summary: 'Error', detail: msg })
    } finally {
      setLoading(false)
    }
  }

  const nodes = useMemo<TreeNode[]>(() => toTreeNodes(data?.children), [data])

  return (
    <div className="p-3">
      <Toast ref={toastRef} />
      <div className="p-fluid grid" style={{ gap: '1rem' }}>
        <div className="col-12">
          <h2 style={{ margin: 0 }}>{data?.title || 'Family Tree'}</h2>
        </div>
        <div className="col-12">
          <Card title="Family Tree">
            {loading && (
              <div className="p-d-flex p-ai-center p-jc-center" style={{ padding: '2rem' }}>
                <ProgressSpinner />
              </div>
            )}
            {!loading && (
              <Tree
                value={nodes}
                filter
                filterMode="lenient"
                className="family-tree"
                // collapsed by default; Tree handles state internally if keys undefined
                // we can set expandedKeys if needed later
              />
            )}
            <div className="p-mt-2 p-text-secondary">
              <i className="pi pi-user" /> Person &nbsp;&nbsp; <i className="pi pi-heart" /> Spouse &nbsp;&nbsp; <i className="pi pi-info-circle" /> Note
            </div>
          </Card>
        </div>
      </div>
      <style>{`
        .spouse-node { color: var(--p-red-600); }
        .family-tree .p-tree { width: 100%; text-align: left; }
      `}</style>
    </div>
  )
}
