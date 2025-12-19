import { IssuePayload } from "../../types/issue.type";

interface bugTarget {
  title: string;
  description: string;
}

export function bugTarget({ title, description }: bugTarget): IssuePayload {
  return {
    title: `${title}`,
    body: `
            ## Bug report

            ## Descrição
            ${description}

            ### Passos para reproduzir
            1.
            2.
            3.

            ### Comportamento esperado
            

            ### Ambiente
            - OS:
            - Node:
            - Browser:
        `,
    labels: ["bug"],
  };
}
