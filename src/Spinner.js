/**
 * @author: Anh Chung
 * @created: 10/14/2018
 * @description:
 */
'use strict'
import React from "react";
import "./Spinner.css";

export default function Spinner({ size="medium" }) {
    return <div className={`spinner spinner-${size}`} />;
}
