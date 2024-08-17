/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NewObservationFormInputValues = {
    date?: string;
    time?: string;
    timeName?: string;
    count?: number;
    stage?: string;
    sex?: string;
    condition?: string;
    depth?: number;
    distance?: number;
    temperature?: number;
    latitude?: number;
    longitude?: number;
    description?: string;
    comments?: string;
    substrate?: string[];
    weight?: number;
    reportType?: string;
    site?: string;
    country?: string;
    specieCommonName?: string;
    specie?: string;
    reporter?: string;
    photographer?: string;
    mediaSource?: string;
    length?: number;
    diskLength?: number;
    width?: number;
    group?: string;
    labels?: string[];
    Media?: string[];
};
export declare type NewObservationFormValidationValues = {
    date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    timeName?: ValidationFunction<string>;
    count?: ValidationFunction<number>;
    stage?: ValidationFunction<string>;
    sex?: ValidationFunction<string>;
    condition?: ValidationFunction<string>;
    depth?: ValidationFunction<number>;
    distance?: ValidationFunction<number>;
    temperature?: ValidationFunction<number>;
    latitude?: ValidationFunction<number>;
    longitude?: ValidationFunction<number>;
    description?: ValidationFunction<string>;
    comments?: ValidationFunction<string>;
    substrate?: ValidationFunction<string>;
    weight?: ValidationFunction<number>;
    reportType?: ValidationFunction<string>;
    site?: ValidationFunction<string>;
    country?: ValidationFunction<string>;
    specieCommonName?: ValidationFunction<string>;
    specie?: ValidationFunction<string>;
    reporter?: ValidationFunction<string>;
    photographer?: ValidationFunction<string>;
    mediaSource?: ValidationFunction<string>;
    length?: ValidationFunction<number>;
    diskLength?: ValidationFunction<number>;
    width?: ValidationFunction<number>;
    group?: ValidationFunction<string>;
    labels?: ValidationFunction<string>;
    Media?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NewObservationFormOverridesProps = {
    NewObservationFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    timeName?: PrimitiveOverrideProps<SelectFieldProps>;
    count?: PrimitiveOverrideProps<TextFieldProps>;
    stage?: PrimitiveOverrideProps<SelectFieldProps>;
    sex?: PrimitiveOverrideProps<SelectFieldProps>;
    condition?: PrimitiveOverrideProps<SelectFieldProps>;
    depth?: PrimitiveOverrideProps<TextFieldProps>;
    distance?: PrimitiveOverrideProps<TextFieldProps>;
    temperature?: PrimitiveOverrideProps<TextFieldProps>;
    latitude?: PrimitiveOverrideProps<TextFieldProps>;
    longitude?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    comments?: PrimitiveOverrideProps<TextFieldProps>;
    substrate?: PrimitiveOverrideProps<SelectFieldProps>;
    weight?: PrimitiveOverrideProps<TextFieldProps>;
    reportType?: PrimitiveOverrideProps<TextFieldProps>;
    site?: PrimitiveOverrideProps<TextFieldProps>;
    country?: PrimitiveOverrideProps<TextFieldProps>;
    specieCommonName?: PrimitiveOverrideProps<TextFieldProps>;
    specie?: PrimitiveOverrideProps<TextFieldProps>;
    reporter?: PrimitiveOverrideProps<TextFieldProps>;
    photographer?: PrimitiveOverrideProps<TextFieldProps>;
    mediaSource?: PrimitiveOverrideProps<TextFieldProps>;
    length?: PrimitiveOverrideProps<TextFieldProps>;
    diskLength?: PrimitiveOverrideProps<TextFieldProps>;
    width?: PrimitiveOverrideProps<TextFieldProps>;
    group?: PrimitiveOverrideProps<TextFieldProps>;
    labels?: PrimitiveOverrideProps<TextFieldProps>;
    Media?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NewObservationFormProps = React.PropsWithChildren<{
    overrides?: NewObservationFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NewObservationFormInputValues) => NewObservationFormInputValues;
    onSuccess?: (fields: NewObservationFormInputValues) => void;
    onError?: (fields: NewObservationFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NewObservationFormInputValues) => NewObservationFormInputValues;
    onValidate?: NewObservationFormValidationValues;
} & React.CSSProperties>;
export default function NewObservationForm(props: NewObservationFormProps): React.ReactElement;
