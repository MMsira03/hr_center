import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import swal from "sweetalert";
import axios from "axios";
import PanelHeader from "components/PanelHeader/PanelHeader";

import { useEffect } from "react";
import { tail } from "lodash";
import { data } from "jquery";

export default function Edit(props) {
  // let hr_run_id_props = props.match.params.id
  // const [hr_employeeid, setHr_Employeeid] = useState("");
  // const [hr_employeename, setHr_Employeename] = useState("");
  // const [hr_surname, setHr_Employeesurname] = useState("");
  // const [hr_nickname, setHr_Employeenickname] = useState("");
  // const [hr_phone, setHr_Employeephone] = useState("");
  // const [hr_job_start, setHr_Job_Start] = useState("");
  // const [hr_email_user, setHr_Email_User] = useState("");
  // const [hr_password, setHr_Password] = useState("");
  // const [hr_employee_img, setHr_Eployee_Img] = useState("");
  // const [hr_emp, setHr_Emp] = useState("");
  // const [hr_employee_eng, setHr_Employee_eng] = useState("");
  // const [hr_lastname_eng, setHr_Lastname_Eng] = useState("");

  //================ Edit ==============
  const [hr_employeeid_edit, setHr_Employeeid_edit] = useState("");
  const [hr_employeename_edit, setHr_Employeename_edit] = useState("");
  const [hr_surname_edit, setHr_Employeesurname_edit] = useState("");
  const [hr_nickname_edit, setHr_Employeenickname_edit] = useState("");
  const [hr_phone_edit, setHr_Employeephone_edit] = useState("");
  const [hr_job_start_edit, setHr_Job_Start_edit] = useState("");
  const [hr_email_user_edit, setHr_Email_User_edit] = useState("");
  const [hr_password_edit, setHr_Password_edit] = useState("");
  const [hr_employee_img_edit, setHr_Eployee_Img_edit] = useState("");
  const [hr_emp_edit, setHr_Emp_edit] = useState("");
  const [hr_employee_eng_edit, setHr_Employee_eng_edit] = useState("");
  const [hr_lastname_eng_edit, setHr_Lastname_Eng_edit] = useState("");
  const [number_emp_edit, setNumber_emp_edit] = useState("");
  const [status_emp_edit, setStatus_emp_edit] = useState("");
  const [job_out_edit, setJob_out_edit] = useState("");
  const [birthday_emp_edit, setBirthday_Emp_edit] = useState("");

  const [id_section_edit, setID_section_edit] = useState("");
  const [hr_section_eng_edit, setHr_section_eng_edit] = useState("");

  const [id_department_edit, setID_department_edit] = useState("");

  const [id_position_edit, setID_position_edit] = useState("");

  //======= ID Dynamic ====================================
  const [id_section, setID_section] = useState("");
  const [id_department, setID_department] = useState("");
  const [id_position, setID_position] = useState("");

  //================?????????????????????????????? API =====================
  const [hr_section, setHr_section] = useState([]);
  const [hr_department, setHr_department] = useState([]);
  const [hr_position, setHr_position] = useState([]);
  const [data_all, setData_all] = useState([]);

  //================== file ==============
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const server = "http://localhost:4000/";

  const id = data_all.hr_run_id;
  //==================================
  async function Check_bom(credentials) {
    return fetch(server + "post_form_hr_edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  //=================== onSubmit_input_form ==============
  const input_form = async (event) => {
    event.preventDefault();
    uploadFile();
    const response = await Check_bom({
      id,
      hr_employeeid_edit,
      hr_employeename_edit,
      hr_surname_edit,
      hr_nickname_edit,
      hr_phone_edit,
      hr_job_start_edit,
      hr_email_user_edit,
      hr_password_edit,
      hr_employee_img_edit,
      hr_emp_edit,
      hr_employee_eng_edit,
      hr_lastname_eng_edit,
      id_section_edit,
      hr_section_eng_edit,
      id_department_edit,
      id_position_edit,
      number_emp_edit,
      status_emp_edit,
      job_out_edit,
      birthday_emp_edit,
    });

    // =========================== swal =============================
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        window.location.href = "/admin/edit_emp/" + response.id;
      });
    } else {
      swal("????????????????????????????????????????????????????????????", response.message, "error");
    }
  };

  //=========== type file_img=========
  const old_img = data_all.hr_employee_img;
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("hr_run_id", id);
    formData.append("old_image", old_img);
    try {
      const res = await axios.post(
        "http://localhost:4000/upload_edit",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  //============== dynamic_section=================
  useEffect(() => {
    fetch("http://localhost:4000/set_project_hr/" + props.match.params.id)
      .then((response) => response.json())
      .then((result) => setData_all(result))
      .catch((Error) => Error);
  }, []);

  //============== dynamic_section=================
  useEffect(() => {
    fetch("http://localhost:4000/dynamic_section")
      .then((response) => response.json())
      .then((result) => setHr_section(result))
      .catch((Error) => Error);
  }, []);

  //========== dynamic_dapartment==============
  useEffect(() => {
    fetch("http://localhost:4000/dynamic_department/" + id_section_edit)
      .then((response) => response.json())
      .then((result) => setHr_department(result))
      .catch((Error) => Error);
  }, [id_section_edit]);

  // //========== dynamic_position ==============
  useEffect(() => {
    fetch("http://localhost:4000/dynamic_position/" + id_department_edit)
      .then((response) => response.json())
      .then((result) => setHr_position(result))
      .catch((Error) => Error);
  }, [id_department_edit]);

  const Set_edit = () => {
    setHr_Employeeid_edit(data_all.hr_employeeid);
    setHr_Job_Start_edit(data_all.hr_job_start);
    setHr_Email_User_edit(data_all.hr_email_user);
    setHr_Employeename_edit(data_all.hr_employeename);
    setHr_Employeesurname_edit(data_all.hr_surname);
    setHr_Employee_eng_edit(data_all.hr_employee_eng);
    setHr_Lastname_Eng_edit(data_all.hr_lastname_eng);
    setHr_Employeenickname_edit(data_all.hr_nickname);
    setHr_Employeephone_edit(data_all.hr_phone);
    setHr_Emp_edit(data_all.hr_emp);
    // setID_section_eng_edit(data_all.eng_section)
    setID_section_edit(data_all.id_section);
    setID_department_edit(data_all.id_department);
    // setID_department_eng_edit(data_all.eng_department)
    setID_position_edit(data_all.id_position);
    setHr_Password_edit(data_all.hr_password);
    setNumber_emp_edit(data_all.number_emp);
    setJob_out_edit(data_all.job_out);
    setBirthday_Emp_edit(data_all.birthday_emp);
    setStatus_emp_edit(data_all.status_emp);

    //========== radio ????????????????????? ?????????????????? / ???????????????????????? /????????????????????????????????? / ???????????????????????????????????????????????? /??????????????????????????? ===========
    if (data_all.hr_emp === "????????????????????????") {
      document.getElementById("cat_1").checked = true;
    } else if (data_all.hr_emp === "??????????????????") {
      document.getElementById("cat_2").checked = true;
    } else if (data_all.hr_emp === "?????????????????????????????????") {
      document.getElementById("cat_3").checked = true;
    } else if (data_all.hr_emp === "???????????????????????????") {
      document.getElementById("cat_4").checked = true;
      // document.getElementById("po").style.visibility = "hidden";
      // document.getElementById("label_po").style.visibility = "hidden";
    }else if (data_all.hr_emp === "????????????????????????????????????????????????") {
      document.getElementById("asst").checked = true;
    }

    //???????????????????????????????????????
    if (data_all.status_emp === "???????????????????????????") {
      document.getElementById("cat_5").checked = true;
      document.getElementById("check_date_out").style.display = "none";
      document.getElementById("label_check_date_out").style.display = "none";
      document.getElementById("check_date_out").required = false;
    } else if (data_all.status_emp === "???????????????") {
      document.getElementById("cat_6").checked = true;
      document.getElementById("img_emp").disabled = true;
      document.getElementById("id_emp").disabled = true;
      document.getElementById("num_emp").disabled = true;
      document.getElementById("date_emp").disabled = true;
      document.getElementById("name_emp").disabled = true;
      document.getElementById("surname_emp").disabled = true;
      document.getElementById("first_emp").disabled = true;
      document.getElementById("last_emp").disabled = true;
      document.getElementById("nickname_emp").disabled = true;
      document.getElementById("tel_emp").disabled = true;
      document.getElementById("section_emp").disabled = true;
      document.getElementById("de").disabled = true;
      document.getElementById("po").disabled = true;
      document.getElementById("cat_1").disabled = true;
      document.getElementById("cat_2").disabled = true;
      document.getElementById("cat_3").disabled = true;
      document.getElementById("cat_4").disabled = true;
      // document.getElementById("cat_5").disabled= true;
      document.getElementById("mail_emp").disabled = true;
      document.getElementById("pass").disabled = true;
    }
  };

  const Click_emp = () => {
    document.getElementById("po").style.visibility = "";
    document.getElementById("de").style.visibility = "";
    document.getElementById("label_po").style.visibility = "";
    document.getElementById("label_de").style.visibility = "";
  };

  const manager = () => {
    document.getElementById("po").style.visibility = "hidden";
    document.getElementById("de").style.visibility = "";
    document.getElementById("label_po").style.visibility = "hidden";
    document.getElementById("label_de").style.visibility = "";
    setID_position_edit("51");
  };

  const asstmanager = () => {
    document.getElementById("po").style.visibility = "hidden";
    document.getElementById("de").style.visibility = "";
    document.getElementById("label_po").style.visibility = "hidden";
    document.getElementById("label_de").style.visibility = "";
    setID_position_edit("63");
  };

  const director = () => {
    document.getElementById("de").style.visibility = "hidden";
    document.getElementById("po").style.visibility = "hidden";
    document.getElementById("label_de").style.visibility = "hidden";
    document.getElementById("label_po").style.visibility = "hidden";
    setID_department_edit("26");
    setID_position_edit("50");
  };

  const Click_check_work = () => {
    setJob_out_edit("");
    document.getElementById("check_date_out").style.display = "none";
    document.getElementById("label_check_date_out").style.display = "none";
    document.getElementById("check_date_out").required = false;
  };

  const dateout = () => {
    document.getElementById("check_date_out").style.display = "";
    document.getElementById("label_check_date_out").style.display = "";
    document.getElementById("check_date_out").required = true;

    document.getElementById("mail_emp").disabled = true;
    document.getElementById("pass").disabled = true;
  };
  //=========== return ==========================

  //backgroundColor: "#808088",

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content" onLoad={Set_edit}>
        <Row>
          <Col md="11">
            <Card style={{ marginLeft: "4%" }}>
              <CardHeader style={{ backgroundColor: "#747474", color: "#fff" }}>
                <h5 className="title">??????????????????????????????????????????????????????</h5>
              </CardHeader>

              <CardBody>
                <Form onSubmit={input_form}>
                  <Row>
                    <label>??????????????????</label>
                    <br />
                    <img
                      src={"http://localhost:4000/" + data_all.hr_employee_img}
                      alt=""
                      style={{
                        height: "150px",
                        width: "150px",
                        marginBottom: "10px",
                      }}
                    />
                    <br />
                    <br />
                    <br />
                    <Input
                      id="img_emp"
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={saveFile}
                    ></Input>
                    <br /> <br /> <br />
                    <Col sm="3">
                      <FormGroup>
                        <label> ?????????????????????????????????</label>
                        <Input
                          id="id_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="text"
                          defaultValue={data_all.hr_employeeid}
                          placeholder="?????????????????????????????????"
                          onChange={(e) =>
                            setHr_Employeeid_edit(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <label> ??????????????????????????????????????????????????????</label>
                        <Input
                          id="num_emp"
                          type="text"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          placeholder="Num_Employee"
                          defaultValue={data_all.number_emp}
                          onChange={(e) => setNumber_emp_edit(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label>??????????????????????????????</label>
                        <Input
                          id="date_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="date"
                          defaultValue={data_all.hr_job_start}
                          placeholder="??????????????????????????????"
                          onChange={(e) => setHr_Job_Start_edit(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup class="col-md-12">
                        <label> ????????????</label>
                        <Input
                          id="name_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="text"
                          placeholder="????????????(?????????????????????)"
                          defaultValue={data_all.hr_employeename}
                          onChange={(e) =>
                            setHr_Employeename_edit(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup class="col-md-12">
                        <label> ?????????????????????</label>
                        <Input
                          id="surname_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="text"
                          placeholder="?????????????????????"
                          defaultValue={data_all.hr_surname}
                          onChange={(e) =>
                            setHr_Employeesurname_edit(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup class="col-md-12">
                        <label>First Name</label>
                        <Input
                          id="first_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="text"
                          placeholder="name"
                          defaultValue={data_all.hr_employee_eng}
                          onChange={(e) =>
                            setHr_Employee_eng_edit(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>

                    <Col sm="6">
                      <FormGroup class="col-md-12">
                        <label> Last Name</label>
                        <Input
                          id="last_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="text"
                          placeholder="lastname"
                          defaultValue={data_all.hr_lastname_eng}
                          onChange={(e) =>
                            setHr_Lastname_Eng_edit(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="3">
                      <FormGroup>
                        <label> ????????????????????????</label>
                        <Input
                          id="nickname_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="text"
                          placeholder="Nickname"
                          defaultValue={data_all.hr_nickname}
                          onChange={(e) =>
                            setHr_Employeenickname_edit(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <label>?????????/???????????????/??????????????????</label>
                        <Input
                          id="birthday"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="date"
                          defaultValue={data_all.birthday_emp}
                          onChange={(e) => setBirthday_Emp_edit(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label>???????????????????????????????????????</label>
                        <Input
                          id="tel_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="tel"
                          placeholder="Phone"
                          defaultValue={data_all.hr_phone}
                          onChange={(e) =>
                            setHr_Employeephone_edit(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <FormGroup>
                        <label>??????????????????</label>
                        <Input
                          id="section_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="select"
                          onChange={(e) => setID_section_edit(e.target.value)}
                        >
                          <option checked value={data_all.id_section}>
                            {data_all.eng_section}
                          </option>
                          {hr_section.map((data) => {
                            return (
                              <option value={data.id_section}>
                                {data.eng_section}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col sm="4">
                      <FormGroup>
                        <label id="label_de">????????????</label>
                        <Input
                          id="de"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ececf0",
                            color: "red",
                          }}
                          type="select"
                          onChange={(e) =>
                            setID_department_edit(e.target.value)
                          }
                        >
                          {" "}
                          <option checked value={data_all.id_department}>
                            {data_all.eng_department}
                          </option>
                          {hr_department.map((data) => {
                            return (
                              <option value={data.id_department}>
                                {data.eng_department}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col sm="4">
                      <FormGroup>
                        <label id="label_po">?????????????????????</label>
                        <Input
                          id="po"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ececf0",
                            color: "red",
                          }}
                          type="select"
                          defaultValue={hr_position}
                          onChange={(e) => setID_position_edit(e.target.value)}
                        >
                          {" "}
                          <option checked value={data_all.id_position}>
                            {data_all.eng_position}
                          </option>
                          {hr_position.map((data) => {
                            return (
                              <option value={data.id_position}>
                                {data.eng_position}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="6">
                      <FormGroup class="col-md-12">
                        <label>?????????????????????</label>
                        <br />
                        <div>
                          <div style={{ paddingLeft: "30px" }}>
                            <Input
                              onClick={Click_emp}
                              id="cat_1"
                              type="radio"
                              value="????????????????????????"
                              name="cat_em"
                              onChange={(e) => setHr_Emp_edit(e.target.value)}
                            />
                            <label>????????????????????????</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                              onClick={Click_emp}
                              id="cat_2"
                              type="radio"
                              value="??????????????????"
                              name="cat_em"
                              onChange={(e) => setHr_Emp_edit(e.target.value)}
                            />
                            <label>??????????????????</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                              onClick={director}
                              id="cat_3"
                              type="radio"
                              value="?????????????????????????????????"
                              name="cat_em"
                              onChange={(e) => setHr_Emp_edit(e.target.value)}
                            />
                            <label>?????????????????????????????????</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                              onClick={manager}
                              id="cat_4"
                              type="radio"
                              value="???????????????????????????"
                              name="cat_em"
                              onChange={(e) => setHr_Emp_edit(e.target.value)}
                            />
                            <label>???????????????????????????</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                            onClick={asstmanager}
                              id="asst"
                              type="radio"
                              value="????????????????????????????????????????????????"
                              name="cat_em"
                              onChange={(e) => setHr_Emp_edit(e.target.value)}
                            />
                            <label>????????????????????????????????????????????????</label>
                          </div>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label> E-mail</label>
                        <Input
                          id="mail_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="email"
                          placeholder="Email"
                          defaultValue={data_all.hr_email_user}
                          onChange={(e) =>
                            setHr_Email_User_edit(e.target.value)
                          }
                        />
                      </FormGroup>
                    </Col>
                    
                  </Row>
                  <Row>
                   <Col sm="3">
                      <FormGroup>
                        <label> ???????????????????????????????????????</label>
                        <div style={{ paddingLeft: "30px" }}>
                          <Input
                            onClick={Click_check_work}
                            id="cat_5"
                            type="radio"
                            value="???????????????????????????"
                            name="work"
                            onChange={(e) => setStatus_emp_edit(e.target.value)}
                          />
                          <label id="label_job"> ??????????????????????????? </label>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Input
                            onClick={dateout}
                            id="cat_6"
                            type="radio"
                            value="???????????????"
                            name="work"
                            onChange={(e) => setStatus_emp_edit(e.target.value)}
                          />
                          <label>???????????????</label>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <label style={{ color: "red" }} id="label_check_date_out">
                        ???????????????????????????
                      </label>
                      <Input
                        type="date"
                        style={{
                          color: "red",
                          borderColor: "red",
                          backgroundColor: "#ebecf0",
                        }}
                        id="check_date_out"
                        defaultValue={data_all.job_out}
                        onChange={(e) => setJob_out_edit(e.target.value)}
                      ></Input>
                    </Col>

                    <Col sm="6">
                      <FormGroup>
                        <label> ????????????????????????</label>
                        <Input
                          id="pass"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          //type="password"
                          disabled
                          name="pw"
                          defaultValue={" * Password Private * "}
                          //defaultValue={data_all.hr_password}
                          placeholder="Password"
                          onChange={(e) => setHr_Password_edit(e.target.value)}
                        />
                      </FormGroup>
                    </Col> 
                  </Row>{" "}
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#ff3636", marginTop: "3%" }}
                  >
                    ????????????
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
