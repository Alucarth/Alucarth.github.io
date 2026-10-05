<template>
  <div :class="['wrapper', { collapse: !drawer }]">
    <header class="header">
      <div class="header-menu">
        <div class="header-brand">
          <button
            class="sidebar-btn"
            type="button"
            :aria-label="drawer ? 'Contraer menú' : 'Expandir menú'"
            :aria-expanded="drawer"
            aria-controls="sidebar-navigation"
            @click="drawer = !drawer"
          >
            <i class="ki-duotone ki-burger-menu" aria-hidden="true"></i>
          </button>
          <div class="title">PDF <span>Studio</span></div>
        </div>
        <div class="privacy-note">
          <i class="ki-duotone ki-shield-tick" aria-hidden="true"></i>
          <span>Procesamiento local · tus archivos no se suben</span>
        </div>
      </div>
    </header>

    <aside class="sidebar" aria-label="Barra lateral">
      <nav id="sidebar-navigation" class="sidebar-menu" aria-label="Navegación principal">
        <div class="profile">
          <img :src="profileImage" alt="">
          <p>Espacio de trabajo</p>
          <span>Privado en este dispositivo</span>
        </div>
        <ul class="sidebar-nav">
          <li class="item">
            <button class="menu-btn is-active" type="button" aria-current="page">
              <i class="ki-duotone ki-document" aria-hidden="true"></i>
              <span>Unir y ordenar</span>
              <span v-if="documents.length" class="nav-count">{{ documents.length }}</span>
            </button>
          </li>
          <li class="item">
            <button class="menu-btn" type="button" disabled title="Disponible próximamente">
              <i class="ki-duotone ki-pencil" aria-hidden="true"></i>
              <span>Editar PDF</span>
              <span class="soon-label">Próximo</span>
            </button>
          </li>
        </ul>
        <div class="sidebar-footnote">
          <i class="ki-duotone ki-lock-2" aria-hidden="true"></i>
          <p>Los documentos solo viven en esta sesión del navegador.</p>
        </div>
      </nav>
    </aside>

    <main class="main-container">
      <section class="editor-page" aria-labelledby="page-title">
        <div class="page-heading">
          <div>
            <p class="eyebrow"><span>PDF STUDIO</span><i></i> ESPACIO DE TRABAJO</p>
            <h1 id="page-title">Organiza tus PDF</h1>
            <p class="page-description">Combina documentos y coloca cada página en el orden que necesitas.</p>
          </div>
          <button
            class="export-button"
            type="button"
            :disabled="!pages.length || busyAction !== null"
            @click="exportPdf"
          >
            <i class="ki-duotone ki-file-down" aria-hidden="true"></i>
            <span>{{ busyAction === 'exporting' ? 'Preparando…' : 'Exportar PDF' }}</span>
          </button>
        </div>

        <div class="workflow-steps" aria-label="Pasos para combinar documentos">
          <div class="workflow-step is-complete"><span>1</span><p>Añade documentos</p></div>
          <i class="ki-duotone ki-arrow-right" aria-hidden="true"></i>
          <div class="workflow-step" :class="{ 'is-complete': pages.length }"><span>2</span><p>Ordena las páginas</p></div>
          <i class="ki-duotone ki-arrow-right" aria-hidden="true"></i>
          <div class="workflow-step" :class="{ 'is-complete': status.startsWith('PDF exportado') }"><span>3</span><p>Descarga el PDF</p></div>
        </div>

        <div class="editor-workspace">
          <section class="workspace-panel documents-panel" aria-labelledby="documents-title">
            <div class="panel-heading">
              <div>
                <h2 id="documents-title">Documentos</h2>
                <p>{{ documents.length }} {{ documents.length === 1 ? 'archivo añadido' : 'archivos añadidos' }}</p>
              </div>
              <span class="panel-icon"><i class="ki-duotone ki-add-files" aria-hidden="true"></i></span>
            </div>

            <input
              ref="fileInput"
              class="visually-hidden"
              type="file"
              accept="application/pdf,.pdf"
              multiple
              aria-label="Seleccionar archivos PDF"
              @change="handleFileSelection"
            >
            <button
              class="add-files-button"
              type="button"
              :disabled="busyAction !== null"
              @click="$refs.fileInput.click()"
            >
              <i class="ki-duotone ki-plus" aria-hidden="true"></i>
              <span>{{ busyAction === 'loading' ? 'Cargando documentos…' : 'Añadir archivos PDF' }}</span>
            </button>

            <div
              class="drop-hint"
              :class="{ 'is-dragging': isDragging }"
              @dragenter.prevent="isDragging = true"
              @dragover.prevent
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleFileDrop"
            >
              <i class="ki-duotone ki-file-up" aria-hidden="true"></i>
              <span>o arrástralos aquí</span>
            </div>

            <div v-if="documents.length" class="document-list" aria-label="Archivos añadidos">
              <article v-for="document in documents" :key="document.id" class="document-card">
                <button
                  class="document-select"
                  type="button"
                  :aria-label="`Ver ${document.name}`"
                  @click="selectDocument(document.id)"
                >
                  <span class="document-icon"><i class="ki-duotone ki-document" aria-hidden="true"></i></span>
                  <span class="document-info">
                    <strong :title="document.name">{{ document.name }}</strong>
                    <small>{{ document.pageCount }} {{ document.pageCount === 1 ? 'página' : 'páginas' }} · {{ formatFileSize(document.size) }}</small>
                  </span>
                </button>
                <button
                  class="icon-button remove-document"
                  type="button"
                  :aria-label="`Quitar ${document.name}`"
                  :disabled="busyAction !== null"
                  @click="removeDocument(document.id)"
                >
                  <i class="ki-duotone ki-trash" aria-hidden="true"></i>
                </button>
              </article>
            </div>
            <div v-else class="documents-empty">
              <span class="empty-file-icon"><i class="ki-duotone ki-file-added" aria-hidden="true"></i></span>
              <strong>Aún no hay archivos</strong>
              <p>Añade uno o varios PDF para empezar a organizarlos.</p>
            </div>
            <p class="local-only-note"><i class="ki-duotone ki-shield-tick" aria-hidden="true"></i> Tus archivos permanecen en tu navegador.</p>
          </section>

          <section class="workspace-panel pages-panel" aria-labelledby="pages-title">
            <div class="panel-heading">
              <div>
                <h2 id="pages-title">Orden de páginas</h2>
                <p>{{ pages.length }} {{ pages.length === 1 ? 'página' : 'páginas' }} en el PDF final</p>
              </div>
              <span class="panel-icon"><i class="ki-duotone ki-arrow-up-down" aria-hidden="true"></i></span>
            </div>

            <ol v-if="pages.length" class="page-list" aria-label="Páginas en el orden de exportación">
              <li
                v-for="(page, index) in pages"
                :key="page.id"
                class="page-item"
                :class="{ 'is-selected': selectedPageId === page.id }"
              >
                <button class="page-select" type="button" @click="selectedPageId = page.id">
                  <span class="page-number">{{ index + 1 }}</span>
                  <span class="page-details">
                    <strong>Página {{ page.pageNumber }}</strong>
                    <small :title="page.documentName">{{ page.documentName }}</small>
                  </span>
                </button>
                <div class="page-order-controls">
                  <button
                    class="icon-button"
                    type="button"
                    :aria-label="`Mover página ${index + 1} hacia arriba`"
                    :disabled="index === 0 || busyAction !== null"
                    @click="movePage(index, -1)"
                  ><i class="ki-duotone ki-arrow-up" aria-hidden="true"></i></button>
                  <button
                    class="icon-button"
                    type="button"
                    :aria-label="`Mover página ${index + 1} hacia abajo`"
                    :disabled="index === pages.length - 1 || busyAction !== null"
                    @click="movePage(index, 1)"
                  ><i class="ki-duotone ki-arrow-down" aria-hidden="true"></i></button>
                </div>
              </li>
            </ol>
            <div v-else class="pages-empty">
              <i class="ki-duotone ki-file-added" aria-hidden="true"></i>
              <p>Las páginas de tus documentos aparecerán aquí.</p>
            </div>
            <p v-if="pages.length" class="reorder-tip"><i class="ki-duotone ki-information-2" aria-hidden="true"></i> Usa las flechas para cambiar el orden.</p>
          </section>

          <section class="workspace-panel preview-panel" aria-labelledby="preview-title">
            <div class="preview-heading">
              <div>
                <h2 id="preview-title">Vista previa</h2>
                <p v-if="activePage && activeDocument">{{ activeDocument.name }} · página {{ activePage.pageNumber }} de {{ activeDocument.pageCount }}</p>
                <p v-else>Selecciona una página para previsualizarla</p>
              </div>
              <div v-if="pages.length" class="preview-navigation">
                <button
                  class="icon-button"
                  type="button"
                  aria-label="Página anterior"
                  :disabled="selectedPageIndex <= 0"
                  @click="selectPageAt(selectedPageIndex - 1)"
                ><i class="ki-duotone ki-arrow-left" aria-hidden="true"></i></button>
                <span>{{ selectedPageIndex + 1 }} / {{ pages.length }}</span>
                <button
                  class="icon-button"
                  type="button"
                  aria-label="Página siguiente"
                  :disabled="selectedPageIndex >= pages.length - 1"
                  @click="selectPageAt(selectedPageIndex + 1)"
                ><i class="ki-duotone ki-arrow-right" aria-hidden="true"></i></button>
              </div>
            </div>
            <div class="preview-canvas">
              <canvas
                v-if="activeDocument && activePage"
                ref="previewCanvas"
                class="preview-page"
                :aria-label="`Vista previa de ${activeDocument.name}, página ${activePage.pageNumber}`"
              ></canvas>
              <div v-else class="preview-empty">
                <span><i class="ki-duotone ki-eye" aria-hidden="true"></i></span>
                <strong>Tu espacio de previsualización</strong>
                <p>Añade un PDF y selecciona una página para verla aquí.</p>
              </div>
              <div v-if="isRenderingPreview" class="preview-rendering" role="status">
                <span class="loading-spinner" aria-hidden="true"></span>
                <span>Preparando vista previa…</span>
              </div>
              <p v-if="previewError" class="preview-render-error" role="alert">{{ previewError }}</p>
            </div>
            <div class="preview-footer">
              <i class="ki-duotone ki-information-2" aria-hidden="true"></i>
              <span>Las páginas se renderizan en este dispositivo.</span>
            </div>
          </section>
        </div>

        <p v-if="errorMessage" class="feedback-message feedback-error" role="alert">
          <i class="ki-duotone ki-cross-circle" aria-hidden="true"></i>{{ errorMessage }}
        </p>
        <p v-if="status" class="feedback-message feedback-status" role="status">
          <i class="ki-duotone ki-check-circle" aria-hidden="true"></i>{{ status }}
        </p>
      </section>
    </main>

    <div v-if="busyAction === 'exporting'" class="processing-backdrop">
      <section
        class="processing-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="processing-title"
        aria-describedby="processing-description"
      >
        <span class="processing-icon"><i class="ki-duotone ki-file-down" aria-hidden="true"></i></span>
        <h2 id="processing-title">Preparando tu PDF</h2>
        <p id="processing-description">{{ exportMessage }}</p>
        <progress class="processing-progress" :value="exportProgress" max="100">
          {{ exportProgress }}%
        </progress>
        <div class="processing-details">
          <span>Procesamiento local y privado</span>
          <strong>{{ exportProgress }}%</strong>
        </div>
        <p class="processing-note">No cierres esta ventana hasta que termine la exportación.</p>
      </section>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import profileImage from '../../img/profile.jpg';

pdfjsLib.GlobalWorkerOptions.workerSrc = import.meta.env.DEV
  ? pdfWorker
  : new URL(
    'pdf.worker.min.mjs',
    Array.from(document.scripts).find((script) => script.src.endsWith('/index.js'))?.src ?? document.baseURI,
  ).href;

export default {
  data: () => ({
    drawer: true,
    documents: [],
    pages: [],
    selectedPageId: null,
    nextDocumentId: 1,
    nextPageId: 1,
    busyAction: null,
    exportProgress: 0,
    exportMessage: 'Organizando las páginas seleccionadas…',
    errorMessage: '',
    status: '',
    isDragging: false,
    isRenderingPreview: false,
    previewError: '',
  }),
  computed: {
    activePage() {
      return this.pages.find((page) => page.id === this.selectedPageId) ?? null;
    },
    activeDocument() {
      return this.documents.find((document) => document.id === this.activePage?.documentId) ?? null;
    },
    selectedPageIndex() {
      return this.pages.findIndex((page) => page.id === this.selectedPageId);
    },
  },
  watch: {
    selectedPageId() {
      this.renderPreview();
    },
  },
  created() {
    this.activeRenderTask = null;
    this.previewSequence = 0;
  },
  beforeUnmount() {
    this.previewSequence += 1;
    this.activeRenderTask?.cancel();
  },
  methods: {
    async handleFileSelection(event) {
      const files = Array.from(event.target.files ?? []);
      event.target.value = '';
      await this.addFiles(files);
    },
    async handleFileDrop(event) {
      this.isDragging = false;
      await this.addFiles(Array.from(event.dataTransfer?.files ?? []));
    },
    async addFiles(files) {
      if (!files.length || this.busyAction !== null) return;

      this.busyAction = 'loading';
      this.errorMessage = '';
      this.status = '';
      const addedNames = [];
      const errors = [];

      try {
        for (const file of files) {
          if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
            errors.push(`${file.name}: el archivo no tiene formato PDF.`);
            continue;
          }

          try {
            const parsedPdf = await PDFDocument.load(await file.arrayBuffer());
            const pageCount = parsedPdf.getPageCount();
            if (!pageCount) {
              errors.push(`${file.name}: el documento no contiene páginas.`);
              continue;
            }

            const documentId = this.nextDocumentId++;
            const document = {
              id: documentId,
              name: file.name,
              size: file.size,
              pageCount,
              file,
            };
            this.documents.push(document);
            const newPages = Array.from({ length: pageCount }, (_, pageIndex) => ({
              id: this.nextPageId++,
              documentId,
              documentName: file.name,
              pageIndex,
              pageNumber: pageIndex + 1,
            }));
            this.pages.push(...newPages);
            if (!this.selectedPageId) this.selectedPageId = newPages[0].id;
            addedNames.push(file.name);
          } catch (error) {
            errors.push(`${file.name}: no se pudo leer el PDF (${error.message}).`);
          }
        }
      } finally {
        this.busyAction = null;
      }

      if (addedNames.length) {
        this.status = `${addedNames.length} ${addedNames.length === 1 ? 'documento añadido' : 'documentos añadidos'}.`;
      }
      if (errors.length) {
        this.errorMessage = errors.join(' ');
      }
    },
    selectDocument(documentId) {
      const page = this.pages.find((item) => item.documentId === documentId);
      if (page) this.selectedPageId = page.id;
    },
    removeDocument(documentId) {
      if (this.busyAction !== null) return;
      const document = this.documents.find((item) => item.id === documentId);
      if (!document) return;

      this.documents = this.documents.filter((item) => item.id !== documentId);
      this.pages = this.pages.filter((page) => page.documentId !== documentId);
      if (!this.pages.some((page) => page.id === this.selectedPageId)) {
        this.selectedPageId = this.pages[0]?.id ?? null;
      }
      this.errorMessage = '';
      this.status = `"${document.name}" se quitó del espacio de trabajo.`;
    },
    movePage(index, offset) {
      const destination = index + offset;
      if (destination < 0 || destination >= this.pages.length || this.busyAction !== null) return;
      const reorderedPages = [...this.pages];
      [reorderedPages[index], reorderedPages[destination]] = [reorderedPages[destination], reorderedPages[index]];
      this.pages = reorderedPages;
      this.status = 'Orden de páginas actualizado.';
      this.errorMessage = '';
    },
    selectPageAt(index) {
      if (index >= 0 && index < this.pages.length) this.selectedPageId = this.pages[index].id;
    },
    async renderPreview() {
      const sequence = ++this.previewSequence;
      this.activeRenderTask?.cancel();
      this.activeRenderTask = null;
      this.previewError = '';

      const page = this.activePage;
      const sourceDocument = this.activeDocument;
      if (!page || !sourceDocument) {
        this.isRenderingPreview = false;
        return;
      }

      this.isRenderingPreview = true;
      await nextTick();
      const canvas = this.$refs.previewCanvas;
      if (sequence !== this.previewSequence) return;
      if (!canvas) {
        this.previewError = 'No se pudo preparar el área de vista previa.';
        this.isRenderingPreview = false;
        return;
      }

      let pdf = null;
      let renderTask = null;
      try {
        const loadingTask = pdfjsLib.getDocument({
          data: new Uint8Array(await sourceDocument.file.arrayBuffer()),
        });
        pdf = await loadingTask.promise;
        if (sequence !== this.previewSequence) return;

        const pdfPage = await pdf.getPage(page.pageNumber);
        if (sequence !== this.previewSequence) return;
        const baseViewport = pdfPage.getViewport({ scale: 1 });
        const availableWidth = Math.max(220, canvas.parentElement.clientWidth - 36);
        const scale = Math.min(availableWidth / baseViewport.width, 1.5);
        const outputScale = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = pdfPage.getViewport({ scale: scale * outputScale });

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.width = `${Math.floor(baseViewport.width * scale)}px`;
        canvas.style.height = `${Math.floor(baseViewport.height * scale)}px`;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('El navegador no pudo crear el lienzo de vista previa.');

        renderTask = pdfPage.render({ canvasContext: context, viewport });
        this.activeRenderTask = renderTask;
        await renderTask.promise;
      } catch (error) {
        if (sequence === this.previewSequence && error.name !== 'RenderingCancelledException') {
          this.previewError = `No se pudo previsualizar esta página: ${error.message}`;
        }
      } finally {
        if (this.activeRenderTask === renderTask) this.activeRenderTask = null;
        if (pdf) await pdf.destroy();
        if (sequence === this.previewSequence) this.isRenderingPreview = false;
      }
    },
    formatFileSize(bytes) {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    },
    async exportPdf() {
      if (!this.pages.length || this.busyAction !== null) return;

      this.busyAction = 'exporting';
      this.exportProgress = 0;
      this.exportMessage = 'Preparando los documentos…';
      this.errorMessage = '';
      this.status = '';
      await nextTick();
      await new Promise((resolve) => window.setTimeout(resolve, 0));

      try {
        const outputPdf = await PDFDocument.create();
        const copiedPages = new Map();
        const documentIds = [...new Set(this.pages.map((page) => page.documentId))];

        for (let index = 0; index < documentIds.length; index += 1) {
          const documentId = documentIds[index];
          const document = this.documents.find((item) => item.id === documentId);
          if (!document) throw new Error('No se encontró uno de los documentos seleccionados.');

          this.exportMessage = `Leyendo "${document.name}"…`;
          this.exportProgress = Math.round((index / documentIds.length) * 55);
          await nextTick();
          await new Promise((resolve) => window.setTimeout(resolve, 0));
          const sourcePdf = await PDFDocument.load(await document.file.arrayBuffer());

          this.exportMessage = `Procesando las páginas de "${document.name}"…`;
          const sourcePageIndices = this.pages
            .filter((page) => page.documentId === documentId)
            .map((page) => page.pageIndex);
          const copiedDocumentPages = await outputPdf.copyPages(sourcePdf, sourcePageIndices);
          copiedPages.set(
            documentId,
            new Map(sourcePageIndices.map((pageIndex, pagePosition) => [
              pageIndex,
              copiedDocumentPages[pagePosition],
            ])),
          );
          this.exportProgress = Math.round(((index + 1) / documentIds.length) * 55);
          await nextTick();
          await new Promise((resolve) => window.setTimeout(resolve, 0));
        }

        this.exportMessage = 'Aplicando el orden final de las páginas…';
        for (let index = 0; index < this.pages.length; index += 1) {
          const page = this.pages[index];
          const copiedPage = copiedPages.get(page.documentId)?.get(page.pageIndex);
          if (!copiedPage) throw new Error(`No se pudo preparar la página ${page.pageNumber}.`);
          outputPdf.addPage(copiedPage);
          if ((index + 1) % 10 === 0 || index === this.pages.length - 1) {
            this.exportProgress = 55 + Math.round(((index + 1) / this.pages.length) * 25);
            await nextTick();
            await new Promise((resolve) => window.setTimeout(resolve, 0));
          }
        }

        copiedPages.clear();
        this.exportMessage = 'Generando el archivo PDF…';
        this.exportProgress = 85;
        await nextTick();
        await new Promise((resolve) => window.setTimeout(resolve, 0));
        const pdfBytes = await outputPdf.save();
        const downloadUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = 'documentos-unidos.pdf';
        downloadLink.click();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
        this.exportProgress = 100;
        this.exportMessage = 'Tu documento está listo.';
        this.status = `PDF exportado con ${this.pages.length} ${this.pages.length === 1 ? 'página' : 'páginas'}.`;
      } catch (error) {
        this.errorMessage = `No se pudo exportar el PDF: ${error.message}`;
      } finally {
        this.exportMessage = 'Preparando los documentos…';
        this.exportProgress = 0;
        this.busyAction = null;
      }
    },
  },
  setup() {
    return { profileImage };
  },
};
</script>
