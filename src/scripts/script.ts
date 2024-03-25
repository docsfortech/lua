import MyWorker from './fengari-web?worker';

const worker = new MyWorker();

Reflect.set(window, 'worker', worker);

const output = document.getElementById("output")!;
const initialCode = document.getElementById("editor-target")!.textContent!;

import CodeFlask from 'codeflask';
import { language, grammar } from '../data/grammar';
const target = document.getElementById('editor-target')!;

const flask = new CodeFlask(target, {
    language: language,
    defaultTheme: false,
});

flask.addLanguage(language, grammar as any);

flask.updateCode(initialCode);

function clearOutput() {
  while (output.firstChild) {
    output.removeChild(output.firstChild);
  }
}

function appendOutput(content: string, className: string) {
  if (!content) return;
  const element = document.createElement("pre");
  element.textContent = content;
  element.className = className;
  output.appendChild(element);
}

let workerWorking = false;
let queuedWork: string | undefined = undefined;

function sendToWorker(code: string) {
  clearOutput();
  // if (workerWorking) {
  //   queuedWork = code;
  //   return;
  // }
  // workerWorking = true;
  worker.postMessage({
    type: "load",
    source: code,
  });
}

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

function debounce<T extends Function>(fn: T, delay: number) {
  let timer:number | undefined;
  return (...args:ArgumentTypes<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

worker.addEventListener('message', (event) => {
  console.log("worker said:", event.data)
  const result = event.data;
  appendOutput(result.message, result.type);
  // workerWorking = false;
  // if (queuedWork) sendToWorker(queuedWork);
  // queuedWork = undefined;
})

// worker.onmessage = (event) => {
//   // Handle the result of the compilation and execution
//   const result = event.data;
//   console.log(result);
//   // switch (result.type) {
//   //   case "log":
//   //     appendOutput(result.message, "log");
//   //     break;
//   //   case "error":
//   //     appendOutput(result.message, "error");
//   //     break;
//   //   case "warning":
//   //     appendOutput(result.message, "warning");
//   //     break;
//   // }
//   // clearOutput();
//   // if (result.log) appendOutput(result.log, "log");
//   // if (result.error) appendOutput(result.error, "error");
//   // for (const warning of result.warnings || []) {
//   //   appendOutput(warning, "warning");
//   // }

//   // Deal with any queued work
//   // workerWorking = false;
//   // if (queuedWork) sendToWorker(queuedWork);
//   // queuedWork = undefined;
// };

flask.onUpdate(debounce((code: string) => sendToWorker(code), 500));
