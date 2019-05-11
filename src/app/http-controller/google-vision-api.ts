import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http'

@Injectable()
export class GoogleVisionApiProvider{

    headers = new HttpHeaders();
    constructor(public http: HttpClient){

    }

    postGoogleVisionApi(base64){
        const httpOptions = {headers: this.headers};
        let body={
            "requests": [
              {
                "image": {
                  "content": base64
                },
                "features": [
                    {
                      "type": "LABEL_DETECTION" // 라벨 인지: 영어로 나옴
                    },
                    {
                      "type": "LOGO_DETECTION"
                    },
                    {
                      "type": "LANDMARK_DETECTION"  // 랜드마크 인지: 영어로 나옴
                    },
                    {
                      "type": "DOCUMENT_TEXT_DETECTION"
                    },
                ],
                "imageContext": {
                    "languageHints": ["en-t-i0-handwrit", "ko-t-i0-handwrit"]  // 필기체 인식도 되게하는 속성
                }
              }
            ]
          };

        return this.http.post("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDFLEkfvCIf_cYLcgZnVjHxdFaws9I8614", body, httpOptions);

    }


}