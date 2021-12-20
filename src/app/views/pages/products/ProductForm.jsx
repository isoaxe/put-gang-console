import {
    Card,
    Grid,
    Icon,
    Button,
    Divider,
    MenuItem,
    TextField,
} from '@mui/material'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Breadcrumb } from 'app/components'
import { useDropzone } from 'react-dropzone'
import React, { useEffect, useState } from 'react'
import { Box, styled, useTheme } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { convertHexToRGB } from 'utils'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const Form = styled('form')(() => ({
    paddingLeft: '16px',
    paddingRight: '16px',
}))

const StyledTextField = styled(TextField)(() => ({
    marginBottom: '16px',
}))

const DropZone = styled(FlexBox)(({ isDragActive, theme }) => ({
    width: '100%',
    height: 160,
    cursor: 'pointer',
    marginBottom: '16px',
    borderRadius: '4px',
    justifyContent: 'center',
    transition: 'all 350ms ease-in-out',
    border: `2px dashed rgba(${convertHexToRGB(
        theme.palette.text.primary
    )}, 0.3)`,
    '&:hover': {
        background: `rgb(${convertHexToRGB(
            theme.palette.text.primary
        )}, 0.2) !important`,
    },
    background: isDragActive ? 'rgb(0, 0, 0, 0.15)' : 'rgb(0, 0, 0, 0.01)',
}))

const ProductForm = () => {
    const [imageList, setImageList] = useState([])
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
        useDropzone({ accept: 'image/*' })

    const handleSubmit = async (values, { isSubmitting }) => {
        console.log(values)
    }
    useEffect(() => {
        setImageList(acceptedFiles)
    }, [acceptedFiles])

    const { palette } = useTheme()
    const textMuted = palette.text.secondary

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Pages', path: '/pages' },
                        { name: 'New Product' },
                    ]}
                />
            </div>

            <Card elevation={3}>
                <Box p={2} display="flex">
                    <H4>Add New Product</H4>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                    validationSchema={productSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setSubmitting,
                        setFieldValue,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item sm={6} xs={12}>
                                    <StyledTextField
                                        name="name"
                                        label="Name"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name || ''}
                                        error={Boolean(
                                            touched.name && errors.name
                                        )}
                                        helperText={touched.name && errors.name}
                                    />
                                    <StyledTextField
                                        name="description"
                                        label="Description"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        multiline
                                        // rows={8}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.description || ''}
                                        error={Boolean(
                                            touched.description &&
                                                errors.description
                                        )}
                                        helperText={
                                            touched.description &&
                                            errors.description
                                        }
                                    />
                                    <StyledTextField
                                        name="category"
                                        label="Category"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.category || ''}
                                        error={Boolean(
                                            touched.category && errors.category
                                        )}
                                        helperText={
                                            touched.category && errors.category
                                        }
                                    >
                                        {categoryList.sort().map((cat) => (
                                            <MenuItem value={cat} key={cat}>
                                                {cat}
                                            </MenuItem>
                                        ))}
                                    </StyledTextField>

                                    <DropZone {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <FlexBox flexDirection="column">
                                            <Icon
                                                sx={{
                                                    color: textMuted,
                                                    fontSize: '48px',
                                                }}
                                            >
                                                publish
                                            </Icon>
                                            {imageList.length ? (
                                                <span>
                                                    {imageList.length} images
                                                    were selected
                                                </span>
                                            ) : (
                                                <span>Drop product images</span>
                                            )}
                                        </FlexBox>
                                    </DropZone>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <StyledTextField
                                        name="productCode"
                                        label="Product Code"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.productCode || ''}
                                        error={Boolean(
                                            touched.productCode &&
                                                errors.productCode
                                        )}
                                        helperText={
                                            touched.productCode &&
                                            errors.productCode
                                        }
                                    />
                                    <StyledTextField
                                        name="sku"
                                        label="SKU"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.sku || ''}
                                        error={Boolean(
                                            touched.sku && errors.sku
                                        )}
                                        helperText={touched.sku && errors.sku}
                                    />
                                    <StyledTextField
                                        name="price"
                                        label="Price"
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.price || ''}
                                        error={Boolean(
                                            touched.price && errors.price
                                        )}
                                        helperText={
                                            touched.price && errors.price
                                        }
                                    />
                                    <StyledTextField
                                        name="salePrice"
                                        label="Sale Price"
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.salePrice || ''}
                                        error={Boolean(
                                            touched.salePrice &&
                                                errors.salePrice
                                        )}
                                        helperText={
                                            touched.salePrice &&
                                            errors.salePrice
                                        }
                                    />
                                    <StyledTextField
                                        name="quantity"
                                        label="Quantity"
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.quantity || ''}
                                        error={Boolean(
                                            touched.quantity && errors.quantity
                                        )}
                                        helperText={
                                            touched.quantity && errors.quantity
                                        }
                                    />
                                    <StyledTextField
                                        name="minOrderAmount"
                                        label="Minimum Order Amount"
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.minOrderAmount || ''}
                                        error={Boolean(
                                            touched.minOrderAmount &&
                                                errors.minOrderAmount
                                        )}
                                        helperText={
                                            touched.minOrderAmount &&
                                            errors.minOrderAmount
                                        }
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                sx={{ mb: 2, px: 6 }}
                            >
                                Add Product
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card>
        </Container>
    )
}

const productSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    price: yup.number().required('Price is required'),
    category: yup.string().required('Category is required'),
    quantity: yup.number().required('Quantity is required'),
})

const initialValues = {
    name: '',
    sku: '',
    price: '',
    category: '',
    quantity: '',
}

const categoryList = ['Electronics', 'Clothes', 'Toys', 'Books', 'Utensils']
export default ProductForm
