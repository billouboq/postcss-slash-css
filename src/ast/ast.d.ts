declare namespace AST {
  interface Node {
    selector: string,
    props: NodeProps[]
  }

  interface NodeProps {
    prop: string,
    value: string
  }
}