import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {


  QuestionData:any[]=[];
  ngOnInit(): void {}

  openFile(event:any) {
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      let workBook = XLSX.read(fileReader.result,{type:'binary'});
      let sheet1:any[] = workBook.SheetNames;
      for(let sheets of sheet1){
        const data = XLSX.utils.sheet_to_json(workBook.Sheets[sheets]);
        const updateddata = {
          name:sheets,data:data
        }
        this.QuestionData.push(updateddata);
        //this.QuestionData = data.map((res: any) => ({ ...res, userSelected: "" }));
      }
      console.log(this.QuestionData);
    }
   }
   change(data: any, index: any) {
    this.QuestionData[index].userSelected = data;
  }
   selectedTabChange() {}
}
