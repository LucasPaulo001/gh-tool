import { IssuePayload } from "../../types/issue.type";
import { generateArchiveLocal } from "../services/gh-tool-task.js";

interface bugTarget {
  title: string;
  description: string;
}

export function bugTarget({ title, description }: bugTarget): IssuePayload {
  generateArchiveLocal(`
### Bug ${title}

- [ ] ${description}

    `)
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
    labels: ["bug"]
  };
  
}
