declare namespace RemoveDuplicateCSS {
  interface Options {
    targets: string,
  }
}

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
