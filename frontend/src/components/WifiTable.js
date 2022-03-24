import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

//Source: https://mui.com/components/tables/

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.ESSID}</TableCell>
        <TableCell>{row.Manufacturer}</TableCell>
        <TableCell align="right">{row.Seconds_Seen}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                More
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>First seen</TableCell>
                    <TableCell>Last seen</TableCell>
                    <TableCell align="right">Signal strength</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow key={row.Last_Seen}>
                        <TableCell component="th" scope="row">{row.First_Seen}</TableCell>
                        <TableCell>{row.Last_Seen}</TableCell>
                        <TableCell align="right">{row.Signal_Strength}</TableCell>
                    </TableRow>
                  
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    Manufacturer: PropTypes.string,
    First_Seen: PropTypes.string,
    Last_Seen: PropTypes.string,
    ESSID: PropTypes.string,
  })
};

export default function WifiTable({data_list}) {
    const notAvailableMessage = '--'

    const [rows, setRows] = React.useState([{}])

    React.useEffect(() => {
        const newRows = data_list.map(data => {
        var today = new Date();
        var last_seen_dateobj = new Date(data.Last_Seen);
        var time_since_seen = (today - last_seen_dateobj) / 1000;
        var updatedData;
        if(data.ESSID == ' ' || data.ESSID === undefined){
            var essid = notAvailableMessage;
            if(data.Manufacturer == ''){
                var manuf = notAvailableMessage;
                updatedData = {
                    ...data, Seconds_Seen: time_since_seen, ESSID: essid, Manufacturer: manuf
                }
            }else{
                updatedData = {
                    ...data, Seconds_Seen: time_since_seen, ESSID: essid
                }
            }
        }else if(data.Manufacturer == ''){
            var manuf = notAvailableMessage;
                updatedData = {
                    ...data, Seconds_Seen: time_since_seen, Manufacturer: manuf
                }
        }else{
            updatedData = {
                ...data, Seconds_Seen: time_since_seen
            }
        }
        if(time_since_seen <= 6000){
            return updatedData;
        }else{
            return null
        }     
    })
        setRows(newRows)
    }, [])
    if(rows[0] === undefined || rows.length == 1){
        return (
            <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>SSID</TableCell>
                    <TableCell>Manufacturer</TableCell>
                    <TableCell align="right">Seen x seconds ago</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                </TableBody>
            </Table>
            </TableContainer>
        )
    }else{
        return (
            <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>SSID</TableCell>
                    <TableCell>Manufacturer</TableCell>
                    <TableCell align="right">Seen x seconds ago</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {/* Filtering out the null values from the array before mapping through them */}
                {rows.filter(value => value !== null).map((row) => (
                    <Row key={row.MAC_Address} row={row} />
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        );
    } 
}
