import FuseSvgIcon from "@fuse/core/FuseSvgIcon/FuseSvgIcon";
import {
    Autocomplete,
    Button,
    TextField,
    Paper,
    Typography
} from "@mui/material";
import { get } from 'lodash';
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { REACT_APP_LINK_TEMPLATE_LANDING, REACT_APP_LINK_TEMPLATE_GAME_HOME } from "src/constants";
import { selectUser } from "app/store/userSlice";
import { 
    selectAllOffers, 
    selectAllChannels
} from "../store/linkSlice";


const LinkGenerator = () => {
    const user = useSelector(selectUser);
    const allChannels = useSelector(selectAllChannels);
    const allOffers = useSelector(selectAllOffers);
    const [values, setValues] = useState({
        selectedChannelId: null,
        selectedOfferId: null
    });
    const handleChannel = (newValue) => {
        if (!newValue) {
            setValues({ ...values, selectedChannelId: null });
        }
        if (newValue) {
            setValues({ ...values, selectedChannelId: newValue });
        }
    };
    const handleOffer = (newValue) => {
        if (!newValue) {
            setValues({ ...values, selectedOfferId: null });
        }
        if (newValue) {
            setValues({ ...values, selectedOfferId: newValue });
        }
    }
    const generateLink = () => {
        console.log(user.user_id);
    };
    const previewLink = useMemo(() => {
        const selectedChannel = values.selectedChannelId && values.selectedChannelId.id !== null ?
            get(
                allChannels && Array.isArray(allChannels) && allChannels.filter((channel) => channel.id === values.selectedChannelId.id),
                ['0']
            ) : null;
        const selectedOffer = values.selectedOfferId && values.selectedOfferId.id !== null ?
            get(
                allOffers && Array.isArray(allOffers) && allOffers.filter((offer) => offer.id === values.selectedOfferId.id),
                ['0']
            ) : null;
        if (!selectedChannel || !selectedOffer) return "";
        return {
            landing: REACT_APP_LINK_TEMPLATE_LANDING
                .replace("{game_seo}", selectedOffer.game_seo)
                .replace("{utm_medium}", `${user.user_id}_${selectedChannel.media}_${selectedChannel.channel}`)
                .replace("{utm_campaign}", `{campaign_id}_${selectedOffer.game_seo}`),

            home: REACT_APP_LINK_TEMPLATE_GAME_HOME
                .replace("{game_seo}", selectedOffer.game_seo)
                .replace("{utm_medium}", `${user.user_id}_${selectedChannel.media}_${selectedChannel.channel}`)
                .replace("{utm_campaign}", `{campaign_id}_${selectedOffer.game_seo}`)
        }
    }, [user, values]);

    return (
        <div className="pt-24 px-24 rounded-md">
            <div className="flex flex-col md:flex-row items-center space-y-16 md:space-y-0 space-x-0 md:space-x-24">
                <Autocomplete
                    className="w-full md:w-256"
                    id="autocomplete-channel"
                    value={values.selectedChannelId}
                    onChange={(event, newValue) => {
                        handleChannel(newValue);
                    }}
                    options={allChannels}
                    size="small"
                    getOptionLabel={(option) => `${option.media}-${option.channel}`}
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
                    id="autocomplete-offer"
                    value={values.selectedOfferId}
                    onChange={(event, newValue) => {
                        handleOffer(newValue);
                    }}
                    options={allOffers}
                    size="small"
                    getOptionLabel={(option) => `${option.game_name}-${option.percent}%`}
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
                    onClick={() => generateLink()}
                    startIcon={
                        <FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>
                    }
                >
                    Generate Link
                </Button>
                <Typography className="text-18 md:text-18 font-bold tracking-tight">Link Preview: </Typography>
                <Typography className="w-full md:w-512 text-16 md:text-16 truncate">{previewLink.landing}</Typography>
            </div>
        </div>
    )
};

export default LinkGenerator;