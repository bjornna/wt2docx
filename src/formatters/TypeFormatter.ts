import { DocBuilder } from "../DocBuilder";
import { TemplateElement } from "../TemplateNodes";
import { ExportFormat, FormatElementFn } from "../DocFormatter";
// import { xmind } from "./XmindFormatter";
import { adoc } from "./AdocFormatter";
import { xmind } from "./XmindFormatter";

export const formatDvCodedText = (docBuilder: DocBuilder, f: TemplateElement): void => {

  let fn: FormatElementFn;

  switch (docBuilder.exportFormat) {
    case ExportFormat.xmind:
      fn = xmind.dvTypes.formatDvCodedText
      break
    case ExportFormat.fshl:
      break;
    default:
      fn = adoc.dvTypes.formatDvCodedText
      break;
  }

  if (fn)
    fn(docBuilder, f);
}

// export const formatDvChoice = (docBuilder: DocBuilder, f: TemplateElement): void => {
//
//   let fn: FormatElementFn;
//
//   switch (docBuilder.exportFormat) {
//     case ExportFormat.xmind:
//       break;
//     case ExportFormat.fsh:
//       break;
//     default:
//       fn = adoc.dvTypes.formatDvChoice
//       break;
//   }
//
//   if (fn)
//     fn(docBuilder, f);
// }

export const formatDvText = (docBuilder: DocBuilder, f: TemplateElement): void => {

  let fn: FormatElementFn;

  switch (docBuilder.exportFormat) {
    case ExportFormat.xmind:
      fn = xmind.dvTypes.formatDvText
      break;
    case ExportFormat.fshl:
      break;
    default:
      fn = adoc.dvTypes.formatDvText
      break;
  }
  if (fn)
    fn(docBuilder, f);
}

export const formatDvCount = (docBuilder: DocBuilder, f: TemplateElement): void => {

  let fn: FormatElementFn;

  switch (docBuilder.exportFormat) {
    case ExportFormat.xmind:
    case ExportFormat.fshl:
      break;
    default:
      fn = adoc.dvTypes.formatDvCount
      break;
  }
  if (fn)
    fn(docBuilder, f);
}

export const formatDvQuantity = (docBuilder: DocBuilder, f: TemplateElement): void => {

  let fn: FormatElementFn;

  switch (docBuilder.exportFormat) {
    case ExportFormat.xmind:
    case ExportFormat.fshl:
      break;
    default:
      fn = adoc.dvTypes.formatDvQuantity
      break;
  }
  if (fn)
    fn(docBuilder, f);
}

export const formatDvOrdinal = (docBuilder: DocBuilder, f: TemplateElement): void => {

  let fn: FormatElementFn;

  switch (docBuilder.exportFormat) {
    case ExportFormat.xmind:
      fn = xmind.dvTypes.formatDvOrdinal
      break;
    case ExportFormat.fshl:
      break;
    default:
      fn = adoc.dvTypes.formatDvOrdinal
      break;
  }
  if (fn)
    fn(docBuilder, f);
}
export const formatDvDefault = (docBuilder: DocBuilder, f: TemplateElement): void => {

  let fn: FormatElementFn;

  switch (docBuilder.exportFormat) {
    case ExportFormat.xmind:
    case ExportFormat.fshl:
      break;
    default:
      fn = adoc.dvTypes.formatDvDefault
      break;
  }
  if (fn)
    fn(docBuilder, f);
}
