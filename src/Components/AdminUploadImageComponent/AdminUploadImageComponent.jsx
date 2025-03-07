//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, Button, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//images
import empty from "../../Assets/Images/emptyProduct.webp"

//icons
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

//propTypes 
import propTypes from 'prop-types'
import StringHelper from '../../Helpers/StringsHelper'
import { useMyContext } from '../DatabaseView/DatabaseView'

// server
import config from "../../../Config.json";


//Styled Components
const StyledAdminUploadImageComponent = styled(Box)(
    () => ({
    
    })
)

const StyledImageBox = styled(Box)(
    () => ({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
    })
)

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const HiddenInput = styled('input')({
    display: 'none',
});

const imageStyle = {
    width: "140px",
    height: "140px",
    marginBottom: "8px",
    borderRadius: "8px",
}

const AdminUploadImageComponent = (props) => {
    const {
        column,
        error,
        customOnChange,
        imageState,
        value
    } = props;

    // const error = useMemo(() => !!(response?.errors && response.errors[column]), [column, response])
    // const errorMessage = useMemo(() => response?.errors?.[column] ?? '', [column, response?.errors]);
    const label = useMemo(() => StringHelper.capitalizeEachWord(column.split("_").join(" ")), [column])

    const [image, setImage] = imageState
    
    const handleChange = (e) => {
        const value = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(() => event.target.result)
        };
        
        reader.readAsDataURL(value);
        
    }


    const {imagesFolderName = ""} = useMyContext() || {}

    const valueRoute = useMemo(() => value ? `${config.ServerImageRoute}/${imagesFolderName}/${value}` : null, [imagesFolderName, value])

    return (
        <StyledAdminUploadImageComponent>
                <StyledImageBox>
                    <img 
                    src={image ? image : valueRoute ? valueRoute : empty} 
                    alt={column} 
                    style={imageStyle}
                    
                    />
                    <Button size='small' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload {label}
                        <VisuallyHiddenInput 
                        type="file" 
                        accept='image/*' 
                        name={column}
                        onChange={customOnChange ? customOnChange : event => handleChange(event)}
                        />
                    </Button>
                    {/* {error ? 
                    <Box mt={1}>
                        <Typography variant="subtitle1" component="span" color="error">
                            {errorMessage}
                        </Typography>
                    </Box>
                                    
                    : 
                    null} */}
                </StyledImageBox>
        </StyledAdminUploadImageComponent>
    );
};

AdminUploadImageComponent.propTypes = {
    column: propTypes.string,
    response: propTypes.any,
    customOnChange: propTypes.func,
    imageState: propTypes.array,
    value: propTypes.any,
}

export default AdminUploadImageComponent;