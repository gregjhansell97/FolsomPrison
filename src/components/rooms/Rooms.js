import React from 'react';
import PropTypes from 'prop-types';

//material-ui
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

//inhouse

//css
import './Rooms.css'

//styles
const styles = theme => ({
    button: {
        textTransform: "none",
        width: "100%",
        fontSize: "30px",
        marginTop: 3
    }
})

//reactcode

class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    onCanvasClick = (canvas, x, y) => {
        const {floor, rooms, width, height, onRoomClick} = this.props;
        if(floor === "") return;

        x = (x*floor.dim.x)/canvas.width;
        y = (y*floor.dim.y)/canvas.height;

        for(let r of rooms) {
            if(x < r.loc.x) continue;
            if(x > r.loc.x + r.dim.x) continue;
            if(y < r.loc.y) continue;
            if(y > r.loc.y + r.dim.y) continue;
            onRoomClick(r);
            return;
        }
        onRoomClick({});;

    }

    renderCanvas() {
        const {floor, filter, rooms, width, height, map} = this.props;
        if(floor === "") return;
        const canvas = this.canvasRef.current;
        if(canvas == null) {
            return;
        }

        canvas.width = width;
        canvas.height = height;
        canvas.onclick = (event)=>this.onCanvasClick(canvas, event.offsetX, event.offsetY);
        const context = canvas.getContext('2d');

        const width_ratio = canvas.width/floor.dim.x;
        const height_ratio = canvas.height/floor.dim.y;

        context.clearRect(0, 0, canvas.width, canvas.height);
        for(let r of rooms) {
            //adjust location to fit canvas
            const rect_x = parseInt(r.loc.x*width_ratio - 0.65);
            const rect_y = parseInt(r.loc.y*height_ratio - 0.65);

            //adjust size to fit canvas
            const rect_width = parseInt(r.dim.x*width_ratio - 0.65);
            const rect_height = parseInt(r.dim.y*height_ratio - 0.65);



            //decide on color
            context.fillStyle = "#388E3C"; //green
            if(!(r.id in map)) {
                const d_room = map[r.id]
                context.fillStyle = "#757575";
            }
            else if(filter["unoccupied"] && map[r.id].is_occupied) {
                context.fillStyle = "#E53935";
            }

            context.fillRect(rect_x, rect_y, rect_width, rect_height)
            context.font="35px Arial";
            context.textAlign="center";
            context.textBaseline = "middle";
            context.fillStyle = "#FFFFFF";
            context.fillText(r.name,rect_x + (rect_width/2), rect_y+(rect_height/2));
        }
    }

    render() {
        const {classes, rooms, floor} = this.props;
        this.renderCanvas();
        return (
            <div>
                <canvas ref={this.canvasRef} className="canvas"/>
            </div>
        );
    }
}

export default withStyles(styles)(Rooms);
