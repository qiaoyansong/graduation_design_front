import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styleUrls: ['./tiny-editor.component.scss']
})
export class TinyEditorComponent implements OnInit {
  @Input()
  public elementId: string;
  @Output()
  public editorKeyup = new EventEmitter();
  public data;
  constructor() { }
  tinyInit = {
    height: 500,
    menubar: 'file edit view',
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    gecko_spellcheck: false,
    file_browser_callback_types: 'image',
    language: 'zh_CN',
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | table | image | help',
      images_upload_handler(blobInfo, succFun, failFun) {
        let xhr: XMLHttpRequest;
        let formData: FormData;
        xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/test', true);
        formData = new FormData();
        formData.append('file', blobInfo.blob());
        xhr.onload = () => {
          let json;
          if (xhr.status !== 200) {
            failFun('HTTP Error: ' + xhr.status);
            return;
          }
          json = JSON.parse(xhr.responseText);
          if (!json || typeof json.location !== 'string') {
            failFun('Invalid JSON: ' + xhr.responseText);
            return;
          }
          succFun(json.location);
        };
        xhr.send(formData);
    }
  }
  ngOnInit(): void {
  }
}
