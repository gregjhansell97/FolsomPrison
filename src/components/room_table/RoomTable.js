import React from 'react';
import PropTypes from 'prop-types';

//material-ui
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

//inhouse

//styles
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    width: "90%",
  },
});

//reactcode

class RoomTable extends React.Component {
    render() {
        const {classes, room, map} = this.props;
        if(room === undefined){
            return (<h1>hello world</h1>)
        }

        let dynamic_room = {}
        if(room.id in map) {
            dynamic_room = map[room.id];
        }
        let room_fields = {};
        for(let d_field of Object.keys(dynamic_room)){
            const d_value = dynamic_room[d_field];
            if(["boolean", "number"].includes(typeof d_value)){
                room_fields[d_field] = JSON.stringify(d_value);
            }else if(typeof d_value === "string") {
                room_fields[d_field] = d_value;
            }
        }
        for(let s_field of Object.keys(room)){
            const s_value = room[s_field];
            if(["boolean", "number"].includes(typeof s_value)){
                room_fields[s_field] = JSON.stringify(s_value);
            }else if(typeof s_value === "string") {
                room_fields[s_field] = s_value;
            }
        }


        return (
            <div>
            <AppBar
                position="static"
                color="primary">
            <Toolbar>
                <Typography
                    variant="h4"
                    color="inherit">
                    Status
                </Typography>
            </Toolbar>
                        </AppBar>
            <Table className={classes.table}>
            <TableBody>
                {Object.entries(room_fields).map(([f, v], index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Typography
                                variant="h6"
                                color="primary">
                                {f}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                variant="h6"
                                color="default">
                                {v}
                            </Typography>
                        </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
        );
    }
}

/*

*/

export default withStyles(styles)(RoomTable);
