# Who Am I


## About

Fill out some details for resume and run and show it on web page
Download resume as PDF file. 




## Detailed info 

### Location of file. 

In project,  it's in path 'public/info/detail.json'



### Json file format 

    {
      "personalInfo": {
      "name": "",
      
      <!--  If you have your image, write file name of it and place file inside  path of 'public/info'  -->
      <!--  If empty, it wouldn't be shown     -->
      "imagePath": "",
      
      "age": "",
      
      <!--  If empty, it wouldn't be shown     -->
      "address": "",
      
      <!--  If empty, it wouldn't be shown     -->
      "phone":"",
      
      "email": "",
      "summary": "",

      <!--   Description about you. each index will be shown in new line.       -->
      "descriptions": [
        "",
        ""
      ],

      "education": [
        {
          "name": "",
          "location": "",
          <!--  Format -> "yyyy-MM"        -->
          "startDate": "",
          <!--  Format -> "yyyy-MM"        -->
          "endDate": "",
          "degree": ""
        }
      ]
    },
      "workHistory": [
        {
          "name": "",
          "location": "",
          "startDate": "",
          "endDate": "",
          "role": "",
          "projects": [
            {
              "name": "",
              <!--  Format -> "yyyy-MM"        -->
              "startDate": "",
              <!--  Format -> "yyyy-MM"        -->
              "endDate": "",
              
              <!--  List of skill you used in project. ex) ["java", "javascript"]       -->
              "skills": [],
              
              <!--   Detail explanation about what you did             -->
              "role": [
                "",
                "",
                ""
              ],
              <!--     description about project           -->
              "desc": ""
            }
          ]

        }
      ],
      "skills": [
        {
          "name": "Java",
          "score": 100
        },
        {
          "name": "Javascript/Typescript",
          "score": 90
        },

      ],


      "sns": {
        "github": "url",
        "linkedin": "url",
        "instagram": "url",
        "facebook": "url"

      }
    }
    

