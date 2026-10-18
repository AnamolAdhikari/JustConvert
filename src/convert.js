import {PDFDocument} from 'pdf-lib';
import JSZip from 'jszip';
import * as pdfjs from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import {safeStem,extensionFor} from './core.js';
pdfjs.GlobalWorkerOptions.workerSrc=pdfWorker;
export async function imageToImage(file,target,quality=.88,maxDimension=0){
 const bitmap=await createImageBitmap(file);try{
 if(bitmap.width*bitmap.height>40000000)throw Error('Image exceeds the 40-megapixel safety limit. Resize it before converting.');
 let w=bitmap.width,h=bitmap.height;if(maxDimension>0&&Math.max(w,h)>maxDimension){const scale=maxDimension/Math.max(w,h);w=Math.max(1,Math.round(w*scale));h=Math.max(1,Math.round(h*scale))}
 const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');if(!ctx)throw Error('Canvas unavailable');
 if(target==='image/jpeg'){ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h)}ctx.drawImage(bitmap,0,0,w,h);
 const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('Unsupported output format')),target,quality));
 if(blob.type!==target)throw Error('Browser does not support '+target);
 return {blob,name:safeStem(file.name)+'.'+extensionFor[target]};
 }finally{bitmap.close()}
}
export async function imagesToPdf(files){const doc=await PDFDocument.create();for(const file of files){const jpg=await imageToImage(file,'image/jpeg',.92);const img=await doc.embedJpg(await jpg.blob.arrayBuffer());const page=doc.addPage([img.width,img.height]);page.drawImage(img,{x:0,y:0,width:img.width,height:img.height})}return {blob:new Blob([await doc.save()],{type:'application/pdf'}),name:'images.pdf'}}
export async function mergePdfs(files){const doc=await PDFDocument.create();for(const file of files){const src=await PDFDocument.load(await file.arrayBuffer());(await doc.copyPages(src,src.getPageIndices())).forEach(p=>doc.addPage(p))}return {blob:new Blob([await doc.save()],{type:'application/pdf'}),name:'merged.pdf'}}
export async function splitPdf(file){const src=await PDFDocument.load(await file.arrayBuffer());const outputs=[];for(const i of src.getPageIndices()){const doc=await PDFDocument.create();const [page]=await doc.copyPages(src,[i]);doc.addPage(page);outputs.push({blob:new Blob([await doc.save()],{type:'application/pdf'}),name:safeStem(file.name)+'-page-'+(i+1)+'.pdf'})}return outputs}
export async function pdfToImages(file,target='image/png',scale=1.5){const doc=await pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;const outputs=[];try{if(doc.numPages>100)throw Error('PDF exceeds the 100-page export limit. Split it into smaller documents first.');for(let i=1;i<=doc.numPages;i++){const page=await doc.getPage(i);const viewport=page.getViewport({scale});if(viewport.width*viewport.height>40000000)throw Error('PDF page is too large to render safely.');const canvas=document.createElement('canvas');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);const ctx=canvas.getContext('2d');if(!ctx)throw Error('Canvas unavailable');if(target==='image/jpeg'){ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height)}await page.render({canvasContext:ctx,viewport}).promise;const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('Image encoding failed')),target,.9));outputs.push({blob,name:safeStem(file.name)+'-page-'+i+'.'+extensionFor[target]});page.cleanup()}}finally{await doc.destroy()}return outputs}
export async function zipOutputs(outputs){const zip=new JSZip();const used=new Set();for(const output of outputs){let name=output.name;const dot=name.lastIndexOf('.');const stem=dot>0?name.slice(0,dot):name;const ext=dot>0?name.slice(dot):'';let n=2;while(used.has(name.toLowerCase()))name=stem+' ('+(n++)+')'+ext;used.add(name.toLowerCase());zip.file(name,output.blob)}return {blob:await zip.generateAsync({type:'blob',compression:'DEFLATE'}),name:'justconvert-results.zip'}}
