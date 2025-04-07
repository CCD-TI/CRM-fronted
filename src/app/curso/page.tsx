"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import CalendarBox from "@/components/CalenderBox";
import { Metadata } from "next";
import ViewCursos from "./Components/ViewCursos";



const CalendarPage = () => {
  return (
    <>
      {/* <Breadcrumb pageName="Calendar" /> */}
      <div>
        <ViewCursos/>
      </div>
      {/* <CalendarBox /> */}
    </>
  );
};

export default CalendarPage;
