import FuseSvgIcon from "@fuse/core/FuseSvgIcon/FuseSvgIcon";
import {
    Autocomplete,
    Button,
    TextField,
    Paper
} from "@mui/material";

const Channels = [
    "qwe",
    "asd",
    "zxc"
]

const LinkGenerator = () => {
    return (
        <div className="pt-24 px-24 rounded-md">
            <div className="flex flex-col md:flex-row space-y-16 md:space-y-0 space-x-0 md:space-x-24">
                <Autocomplete
                    className="w-full md:w-256"
                    id="checkboxes-tags-demo"
                    // value={integrations}
                    // onChange={(event, newValue) => {
                    //     setIntegrations(newValue);
                    // }}
                    options={Channels}
                    size="small"
                    disableCloseOnSelect
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Channel"
                            placeholder="Channel"
                        />
                    )}
                />
                <Autocomplete
                    className="w-full md:w-256"
                    id="checkboxes-tags-demo"
                    // value={integrations}
                    // onChange={(event, newValue) => {
                    //     setIntegrations(newValue);
                    // }}
                    options={Channels}
                    size="small"
                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Offer"
                            placeholder="Offer"
                        />
                    )}
                />
                <Button
                    className="rounded-md"
                    variant="contained"
                    color="secondary"
                    startIcon={
                        <FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>
                    }
                >
                    Generate Link
                </Button>
            </div>
        </div>
    )
};

export default LinkGenerator;