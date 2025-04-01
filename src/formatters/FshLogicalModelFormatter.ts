<<<<<<< HEAD
import { DocBuilder } from "../DocBuilder";
import fs from "fs-extra";
import { findParentNodeId, TemplateNode,TemplateInput } from "../TemplateNodes";
import { formatOccurrences, isAnyChoice, isDisplayableNode, mapRmTypeText} from "../TemplateTypes";
import { formatAnnotations, formatOccurrencesText } from './DocFormatter';

export const fshl = {

  formatCompositionHeader: (dBuilder: DocBuilder, f: TemplateNode) => {
    const { wt,sb, config } = dBuilder;

    sb.append(`Logical:   ${wt.templateId}`)
    sb.append(` Title:    ${wt.templateId}`)

    sb.append(`Description:  "${f.localizedDescriptions.en}"`)
    sb.append(`  * ^name = ${f.nodeId}`)
    sb.append(`   ^status = #active`)

  },

  saveFile: async (dBuilder: DocBuilder, outFile: string) => {
    fs.outputFileSync(outFile, dBuilder.toString());
    console.log(`\n Exported : ${outFile}`)
  },


  formatLeafHeader: (dBuilder: DocBuilder, f: TemplateNode) => {
    const { wt, sb, config } = dBuilder;

    sb.append(`===  *${f.name}*`).newline()
    if (!config.hideNodeIds) {
      sb.append(`==== Type: \`_${f.rmType}_\``)
      sb.append(`==== Id: \`_${f.nodeId}_\``)
    }

    sb.append(`Logical:   ${wt.templateId}`)
    sb.append(` Title:    ${wt.templateId}`)

    sb.append(`Description:  "${f.localizedDescriptions.en}"`)
    sb.append(`  * ^name = ${f.nodeId}`)
    sb.append(`   ^status = #active`)
    sb.append(`${f.localizedDescriptions.en}`).newline()
  },

  formatNodeContent: (dBuilder: DocBuilder, f: TemplateNode, isChoice: boolean) => {
    const { sb, config } = dBuilder;

    const applyNodeIdFilter = (name: string, nodeIdTxt: string) => {
      if (config.hideNodeIds)
        return name;

      return `${name} + \n ${nodeIdTxt}`
    }

    let resolvedNodeId: string;

    if (f.nodeId)
      resolvedNodeId = `${f.nodeId}`;
    else if (isChoice)
      resolvedNodeId = `${findParentNodeId(f).nodeId}`;
    else
      resolvedNodeId = 'RM'

    const nodeIdText = `NodeID: [${sb.backTick(resolvedNodeId)}] + \n ${sb.backTick(f.id)}`;
    let nodeName = f.localizedName ? f.localizedName : f.name
    nodeName = nodeName ? nodeName : f.id
    // let rmTypeText:string;

    //  if (isDisplayableNode(f.rmType)) {
    const rmTypeText = `${sb.backTick(mapRmTypeText(f.rmType))}`;
    //  } else
    //    rmTypeText = sb.backTick(`Unsupported RM type:  ${f.rmType}`)


    let nameText: string
    const occurrencesText = formatOccurrences(f, config.displayTechnicalOccurrences)
    const formattedOccurrencesText = occurrencesText ? `(_${occurrencesText}_)` : ``

    let descriptionText: string;

    if (config.displayAQLPaths)
      descriptionText = `**AQL**: ${f.aqlPath}`
    else
      descriptionText = dBuilder.getDescription(f)

    if (!isChoice) {
      nameText = `**${nodeName}** + \n Type: ${rmTypeText} ${formattedOccurrencesText}`
      sb.append(`| ${applyNodeIdFilter(nameText, nodeIdText)} | ${descriptionText} `);
      formatAnnotations(dBuilder,f)
    } else {
      nameText = `Type: ${rmTypeText}`
      sb.append(`| ${applyNodeIdFilter(nameText, nodeIdText)} |`);
    }



  },

  formatNodeFooter: (dBuilder: DocBuilder) => {
    dBuilder.sb.append('|====');
  },

  formatUnsupported: (dBuilder: DocBuilder, f: TemplateNode) => {
    dBuilder.sb.append('// Not supported rmType ' + f.rmType);
  },

  formatObservationEvent: (dBuilder: DocBuilder, f: TemplateNode) => {
    const { sb, config } = dBuilder;

    const formattedOccurrencesText = formatOccurrencesText(dBuilder, f);
    const clinicalText = `3+a|===== ${f.name}  ${formattedOccurrencesText}`

    if (config.hideNodeIds)
      sb.append(clinicalText + '\n' + `\`${f.rmType}: _${f.nodeId}_\``);
    else
      sb.append(clinicalText)
  },

  formatInstructionActivity: (dBuilder: DocBuilder, f: TemplateNode) => {
    const { sb, config } = dBuilder;

    const formattedOccurrencesText = formatOccurrencesText(dBuilder, f);
    const clinicalText = `3+a|===== ${f.name}  ${formattedOccurrencesText}`

    if (config.hideNodeIds)
      sb.append(clinicalText + '\n' + `\`${f.rmType}: _${f.nodeId}_\``);
    else
      sb.append(clinicalText)
  },

  formatCluster: (dBuilder: DocBuilder, f: TemplateNode) => {
    const { sb, config } = dBuilder;

    const formattedOccurrencesText = formatOccurrencesText(dBuilder, f);
    const clinicalText = `3+a|===== ${f.name}  ${formattedOccurrencesText}`

    if (!config.hideNodeIds)
      sb.append(clinicalText + '\n' + `\`${f.rmType}: _${f.nodeId}_\``);
    else
      sb.append(clinicalText)
  },

  formatAnnotations: (dBuilder: DocBuilder, f: TemplateNode) => {
    const { sb, config } = dBuilder;

    if (f.annotations) {
      sb.append(`\n`);
      for (const key in f.annotations) {
        if (f.annotations.hasOwnProperty(key)) {
          if (config?.includedAnnotations?.includes(key))
            sb.newline().append(`*${key}*: ${f.annotations[key]}`);
        }
      }
    }
  },

  formatCompositionContextHeader: (dBuilder: DocBuilder, f: TemplateNode) => {
    const { sb, config } = dBuilder;

    const nodeId = f.nodeId ? f.nodeId : `RM:${f.id}`

    sb.append(`==== ${f.name}`);

    if (!config.hideNodeIds) {
      sb.append(`===== \`${f.rmType}: _${nodeId}_\``);
    }

  },

  formatChoiceHeader: (dBuilder: DocBuilder, f: TemplateNode) => {
    const { sb } = dBuilder;
    sb.append('a|');

    if (isAnyChoice(f.children.map(child => child.rmType))) {
      sb.append(`_All data types allowed_`);
      return
    }

    sb.append(`_Multiple data types allowed_`);
    sb.append(`|_SubTypes_ | |`);
=======
import fs from "fs";
import { sushiClient } from 'fsh-sushi';

import { DocBuilder } from "../DocBuilder";
import { TemplateInput, TemplateNode } from '../TemplateNodes';
import { formatOccurrences, isEntry, mapRmType2FHIR, snakeToCamel } from '../TemplateTypes';
import { extractTextInBrackets} from './FormatterUtils';
import { formatLeafHeader } from './DocFormatter';
import { wrap } from 'yargs';

const formatLocalName = (f:TemplateNode) => f.localizedName ? f.localizedName : f.name;
const formatSpaces = (f:TemplateNode) =>  " ".repeat(f.depth*2);

const formatNodeId = (f: TemplateNode):string => f.nodeId?f.nodeId:`RM`
const formatDescription = (dBuilder:DocBuilder,f:TemplateNode,typeConstraint: string = '') =>
  wrapTripleQuote(`\`[${formatNodeId(f)} ${typeConstraint}]\`
                             ${dBuilder.getDescription(f)})`)

const wrapTripleQuote = (inString: string) => `"""${inString}"""`

const appendFSHLM = (dBuilder: DocBuilder, f: TemplateNode, typeConstraint: string = '') => {
  const { sb } = dBuilder;
 // const choiceSuffix: string = isChoice?'x':'';

  sb.append(`${formatSpaces(f)}* ${snakeToCamel(f.localizedName?f.localizedName:f.id,isEntry(f.rmType))} ${formatOccurrences(f,true)} ${mapRmType2FHIR(f.rmType)} "${formatLocalName(f)}" ${formatDescription(dBuilder,f,typeConstraint)}`)

}
const appendBinding = (dBuilder: DocBuilder, f: TemplateNode) => {
  const { sb } = dBuilder;
  const bindingFSH: string = `http://hl7.org/fhir/ValueSet/administrative-gender (preferred)`
  sb.append(`${formatSpaces(f)}* ${snakeToCamel(f.localizedName?f.localizedName:f.id,isEntry(f.rmType))} from ${bindingFSH}`)
};

const formatFSHDefinition = (dBuilder: DocBuilder, f: TemplateNode) => {

  const { sb,wt,config } = dBuilder;
  const techName = snakeToCamel(f.localizedName, true);
  sb.append(`Logical: ${techName}`);
  sb.append(`Title: "${wt.templateId}"`);
  sb.append(`Parent: Element`);
  sb.append(`Description: ${formatDescription(dBuilder,f)}`);
  sb.append(`* ^name = "${snakeToCamel(techName, true)}"`);
  sb.append(`* ^status = #active`);
  sb.append(`* ^version = "${wt.semVer}"`);
  sb.append(`* ^url = "${config.fhirBaseUrl}/StructureDefinition/${snakeToCamel(techName, true)}"`);
}

export const fshl = {

  formatTemplateHeader: (dBuilder: DocBuilder) => {
    const { wt, sb } = dBuilder;
  },

  formatCompositionHeader: (dBuilder: DocBuilder, f: TemplateNode) => {

    const { wt, sb, config } = dBuilder;

    if (config.entriesOnly) return

     formatFSHDefinition(dBuilder,f)
  },

  formatCompositionContextHeader: (dBuilder: DocBuilder, f: TemplateNode) => {
    appendFSHLM(dBuilder,f)
  },


  saveFile: async (dBuilder: DocBuilder, outFile: any): Promise<void> => {


    fs.writeFileSync(outFile, dBuilder.toString(), { encoding: "utf8" });
    console.log(`\n Exported : ${outFile}`)

    await fshl.convertFSH(dBuilder, outFile)
  },

  convertFSH: async (dBuilder: DocBuilder, outFile: any):Promise<void> => {

    const str = dBuilder.toString()
    sushiClient
      .fshToFhir(str, {
      //  dependencies: [{ packageId: "hl7.fhir.us.core", version: "4.0.1" }],
        logLevel: "error",
      })
      .then((results) => {
        fs.writeFileSync(outFile+'.json', JSON.stringify(results.fhir[0]), { encoding: "utf8" });
        console.log(`\n Exported : ${outFile}.json`)     // handle results
      })
      .catch((err) => {
        console.log(`Sushi error: ${err}`)// handle thrown errors
      });
  },

  formatNodeContent: (dBuilder: DocBuilder, f: TemplateNode, isChoice: boolean) => {
    const { wt, sb, config } = dBuilder;
    // Stop Choice being called twice as alreadty handled by Choice Header
    if (f.rmType === 'ELEMENT' || isChoice ) return

    // appendFSHLM(dBuilder,f)
  },

  formatEntryHeader: (dBuilder: DocBuilder, f: TemplateNode) => {
//    sb.append(`${spaces}* ${nodeName} ${occurrencesText} ${rmTypeText} "${localName}" "${f.nodeId}: ${localizedDescription}"`)
    const { wt, sb, config } = dBuilder;

    if (config.entriesOnly)
      formatFSHDefinition(dBuilder, f);
    else
      formatLeafHeader(dBuilder,f)

  },

  formatLeafHeader: (dBuilder: DocBuilder, f: TemplateNode) => {
    appendFSHLM(dBuilder,f)
  },

  formatCluster: (dBuilder: DocBuilder, f: TemplateNode) => {
    appendFSHLM(dBuilder,f)
  },

  formatObservationEvent: (dBuilder: DocBuilder, f: TemplateNode) => {
    appendFSHLM(dBuilder,f)

  },

  formatChoiceHeader: (dBuilder: DocBuilder, f: TemplateNode, isChoice = true) => {
    const { sb} = dBuilder;

    let rmTypeText = '';
    let newText: string = ''
    f.children.forEach((child) => {
      child.parentNode = f
      newText = mapRmType2FHIR(child.rmType)
      if ((rmTypeText.length) === 0)
        rmTypeText = newText
      else {
        if (!rmTypeText.includes(newText))
          rmTypeText = rmTypeText.concat(' or ' + newText)
      }
    });

    sb.append(`${formatSpaces(f)}* ${snakeToCamel(f.id,false)}[x] ${formatOccurrences(f,true)} ${rmTypeText} "${formatLocalName(f)}" "${f.nodeId}: ${dBuilder.getDescription(f)}"`)
//    sb.append(`${spaces}* ${nodeName}[x] ${occurrencesText} ${rmTypeText} "${localName}" "${f.nodeId}: ${localizedDescription}"`)
>>>>>>> ee5dfaa1275be5fad29804bbcacc9d1c58a6d7e6
  },

  dvTypes: {
    formatDvCodedText: (dBuilder: DocBuilder, f: TemplateNode) => {
<<<<<<< HEAD
      const { sb, config } = dBuilder;
      sb.append('a|');

      f?.inputs.forEach((item) => {
        const term = item.terminology === undefined ? 'local' : item.terminology;
        if (item.list) {
//          sb.append(`**Allowed Coded terms**`)
          sb.append('')
          item.list.forEach((list) => {
            const termPhrase = `${term}:${list.value}`
            if (term === 'local') {
              if (config.hideNodeIds)
                sb.append(`* ${list.label}`)
              else
                sb.append(`* ${list.label} +\n ${sb.backTick(termPhrase)}`)
            } else {

              sb.append(`* ${list.label} +\n ${sb.backTick(termPhrase)}`);
            }
          })
        } else
          // Pick up an external valueset description annotation
        if (item.suffix === 'code' && f?.annotations?.vset_description) {
          // Convert /n characters to linebreaks
          const newLined = f.annotations?.vset_description.replace(/\\n/g, String.fromCharCode(10));
          sb.append(newLined)
        }

        if (item.listOpen)
          sb.append(`* _Other text/ coded text allowed_`);
//          appendDescription(f);
      });
    },

    formatDvText: (dBuilder: DocBuilder, f: TemplateNode) => {
      const { sb } = dBuilder;

      sb.append('a|');
      if (f.inputs.length > 0) {
        sb.append('')
        f.inputs.forEach((item) => {
          if (item.list) {
            item.list.forEach((val) => {
              sb.append(`* ${val.value}`);
            });
          } else
            // Pick up an external valueset description annotation
          if (item.suffix !== 'other' && f?.annotations?.vset_description) {
            // Convert /n characters to linebreaks
            const newLined = sb.newLineCoded(f.annotations?.vset_description);
            sb.append(newLined)
          }

          if (item.listOpen)
            sb.append(`* _Other text/coded text allowed_`);

        });
//      appendDescription(f);
      }
    },

    formatDvQuantity: (dBuilder: DocBuilder, f: TemplateNode) => {
      const { sb } = dBuilder;

      sb.append('a|');
      if (f.inputs?.length > 0) {
        sb.append('')
        f.inputs.forEach((item) => {
          if (item.list && item.suffix === 'unit') {
            sb.append('Valid units: +\n')
            item.list.forEach((val) => {
              sb.append(`* ${val.value}`);
=======
      const { sb, config} = dBuilder;

      appendFSHLM(dBuilder,f)

      f?.inputs.forEach((item :TemplateInput) => {
      if (item.list ) {
         item.list.forEach( (list) => {
      // Pick up an external valueset description annotation
            if (item.suffix === 'code' && f?.annotations?.vset_description) {
              const params = new URLSearchParams(f.annotations?.vset_description)
              const bindingFSH: string = `from ${params.get('url')} (${item?.listOpen?'preferred':'required'})`
              sb.append(`${formatSpaces(f)}* ${snakeToCamel(f.localizedName ? f.localizedName : f.id, isEntry(f.rmType))} ${bindingFSH}`)
            }
         })
      }
  });
},

formatDvText: (dBuilder: DocBuilder, f: TemplateNode) => {
  const { sb , config} = dBuilder;

  appendFSHLM(dBuilder,f)

  if (f.inputs.length > 0) {
    f.inputs.forEach((item) => {
      if (item?.suffix !== 'other' && f?.annotations?.vset_description) {
        // Pick up an external valueset description annotation
        const params = new URLSearchParams(f.annotations?.vset_description)
        const bindingFSH: string = `from ${params.get('url')} (${item?.listOpen?'preferred':'required'})`
        sb.append(`${formatSpaces(f)}* ${snakeToCamel(f.localizedName ? f.localizedName : f.id, isEntry(f.rmType))} ${bindingFSH}`)
      }

    });
  }
},

  formatDvOrdinal: (dBuilder: DocBuilder, f: TemplateNode) => {
  const { sb , config} = dBuilder;

  f.inputs.forEach((input) => {
    if (input.list)
      input.list.forEach((listItem) => {
        if (!config.hideXmindValues)
          sb.append(`${formatSpaces(f)} (${listItem.ordinal}) ${listItem.label} [B]`)
      })
  })
},
    formatDvQuantity: (dBuilder: DocBuilder, f: TemplateNode) => {

      let unitStr = ' | '

      if (f.inputs?.length > 0) {
        f.inputs.forEach((item) => {
          if (item.list && item.suffix === 'unit') {
            item.list.forEach((val) => {
              unitStr = unitStr.concat(`${val.label}`);
>>>>>>> ee5dfaa1275be5fad29804bbcacc9d1c58a6d7e6
            });
          }
        });
      }
<<<<<<< HEAD
    },

    formatDvCount: (dBuilder: DocBuilder, f: TemplateNode) => {
      const { sb } = dBuilder;
      sb.append('a|');
      if (f.inputs.length > 0) {
        sb.append('')
        f.inputs.forEach((item) => {
          if ((item.type === 'INTEGER') && (item?.validation?.range)) {
            sb.append('Range: +\n')
            sb.append(`* ${item.validation.range.minOp} ${item.validation.range.min} and ${item.validation.range.maxOp} ${item.validation.range.max}`);
          }
        });
      }
    },

    formatDvDefault: (dBuilder: DocBuilder, f: TemplateNode) => {
      const { sb } = dBuilder;

      if (!isDisplayableNode(f.rmType))
        sb.append("|" + sb.backTick("Unsupported RM type: " + f.rmType));
      else
        sb.append('|')
    },

    formatDvChoice: (dBuilder: DocBuilder, f: TemplateNode) => {
      const { sb} = dBuilder;

      sb.append('a|');

      let subTypesAllowedText: string;
      if (isAnyChoice(f.children.map(child =>  child.rmType)))
        subTypesAllowedText = 'All'
      else
        subTypesAllowedText = 'Multiple'

      sb.append(`_${subTypesAllowedText} data types allowed_`);
    },

    formatDvOrdinal: (dBuilder: DocBuilder, f: TemplateNode) => {
      const { sb } = dBuilder;

      sb.append('a|');
      if (f.inputs) {
        const fi: TemplateInput[] = f.inputs;
        fi.forEach((item) => {
          const formItems = item.list === undefined ? [] : item.list;
          formItems.forEach((n) => {
            const termPhrase = `local:${n.value}`
            sb.append(`* [${n.ordinal}] ${n.label} +\n ${sb.backTick(termPhrase)}`);
          });
        });
      }
    }
  }
=======

      appendFSHLM(dBuilder, f, unitStr)

    },

    formatDvDefault: (dBuilder: DocBuilder, f: TemplateNode) => {
      appendFSHLM(dBuilder,f)
    },

}
>>>>>>> ee5dfaa1275be5fad29804bbcacc9d1c58a6d7e6
}
