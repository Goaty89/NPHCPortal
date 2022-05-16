import { Upload, Button, Space, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function UploadPage() {
    const {Title}=Typography;
  const validateData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
          }

          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }
  };
  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
         <Title level={2}>Upload file</Title>
      <Upload
        listType="picture"
        action="https://nphc-hr.free.beeceptor.com/users/upload"
        onChange={({ file, fileList }) => {
          if (file.status !== "uploading") {
            console.log(file, fileList);
          }
          if (file.status === 'done') {
            console.log(`${file.name} file uploaded successfully`);
          } else if (file.status === 'error') {
            console.log(`${file.name} file upload failed.`);
          }
        }}
        maxCount={3}
        accept=".csv"
        multiple
        beforeUpload={(file) => {
          console.log("this is file--=>", file);
          const reader = new FileReader();

          reader.onload = (e) => {
            console.log(e.target.result);
            validateData(e.target.result);
          };
          reader.readAsText(file);

          return false;
        }}
      >
        <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
      </Upload>
    </Space>
  );
}

export default UploadPage;
