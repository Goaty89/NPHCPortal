// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
let dataSource = [
    {
      key: "abc1",
      id: "abc1",
      name: "Mike",
      salary: 3200,
      login: "Lorem Ipsum",
    },
    {
      key: "abc2",
      id: "abc2",
      name: "John",
      salary: 4000,
      login: "Lorem Ipsum",
    },
    {
        key: "abc3",
        id: "abc3",
        name: "Andrew",
        salary: 3200,
        login: "Lorem Ipsum",
      },
      {
        key: "abc4",
        id: "abc4",
        name: "Elpy Yoh",
        salary: 8020,
        login: "Lorem Ipsum",
      },{
        key: "abc5",
        id: "abc5",
        name: "Hanson",
        salary: 7002.20,
        login: "Lorem Ipsum",
      },
      {
        key: "abc6",
        id: "abc6",
        name: "Lily Kah",
        salary: 3000.80,
        login: "Lorem Ipsum",
      },
  ];

export function getEmployeeData(req, res) {
  return dataSource;
}

export function postEditEmployee(data) {
    dataSource = dataSource.map(existingData => {
        if(existingData.id === data.id) {
            return data
        } else {
            return existingData
        }
    })
   
}

export function postDeleteEmployee(id) {
    dataSource = dataSource.filter(data => data.id !== id);
}

export function postAddEmployee(csvDataList) {

    const convertedCSVlist = csvDataList.map(data => {
        return {
            ...data,
            key: data.id,
        }
    })
}