import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { styled } from "@mui/material/styles";

const Tables = (props) => {

    const HeaderContent = props.header
    const BodyContent = props.body
    const StateVariable = props.statevariable
    const SetStateVariable = props.setstatevariable
    const Keys = props.keys
    console.log("Table props", HeaderContent, BodyContent)

    const HandleDelete = (index) => {
        SetStateVariable(prevValues => prevValues.filter((value, prevIndex) => prevIndex !== index))
        console.log("Table Data", index)
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            fontSize: 13,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>S.No</StyledTableCell>
                            {HeaderContent.map((value) => (
                                <StyledTableCell align='center'>{value}</StyledTableCell>
                            ))}
                            <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {BodyContent.length > 0 &&
                            BodyContent.map((Data, index) => (
                                <StyledTableRow key={index + 1}>
                                    <StyledTableCell align="center" component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    {Keys.map((keyvalue) => {
                                        return <StyledTableCell align="center">{Data[keyvalue]}</StyledTableCell>
                                    }
                                    )}
                                    {/* <StyledTableCell align="center">{Data.type}</StyledTableCell>
                                    <StyledTableCell align="center">{Data.name}</StyledTableCell>
                                    <StyledTableCell align="center">{Data.variety}</StyledTableCell>
                                    <StyledTableCell align="center">{Data.brand}</StyledTableCell>
                                    <StyledTableCell align="center">{Data.area}</StyledTableCell>
                                    <StyledTableCell align="center">{Data.age}</StyledTableCell>
                                    <StyledTableCell align="center">{Data.count}</StyledTableCell>
                                    <StyledTableCell align="center">{Data.organic}</StyledTableCell>
                                    <StyledTableCell align="center">{Data.sellingPeriod}</StyledTableCell> */}
                                    <StyledTableCell align="left" onClick={() => HandleDelete(index)}>
                                        {<HighlightOffIcon style={{ cursor: 'pointer' }} />}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
                {BodyContent.length === 0 && <p style={{ textAlign: 'center' }}>No records  Added</p>}
            </TableContainer>
        </div>
    )
}

export default Tables