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
export declare type NewForm1InputValues = {
    date?: string;
    time?: string;
    timeName?: string;
    reportType?: string;
    site?: string;
    country?: string;
    specieCommonName?: string;
    specie?: string;
    count?: number;
    reporter?: string;
    photographer?: string;
    mediaSource?: string;
    stage?: string;
    sex?: string;
    condition?: string;
    length?: number;
    diskLength?: number;
    width?: number;
    depth?: number;
    distance?: number;
    temperature?: number;
    latitude?: number;
    longitude?: number;
    description?: string;
    comments?: string;
    urlLinks?: string[];
    byUser?: string;
    group?: string;
    checkedByUser?: string;
    substrate?: string[];
    weight?: number;
    Media?: string[];
};
export declare type NewForm1ValidationValues = {
    date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    timeName?: ValidationFunction<string>;
    reportType?: ValidationFunction<string>;
    site?: ValidationFunction<string>;
    country?: ValidationFunction<string>;
    specieCommonName?: ValidationFunction<string>;
    specie?: ValidationFunction<string>;
    count?: ValidationFunction<number>;
    reporter?: ValidationFunction<string>;
    photographer?: ValidationFunction<string>;
    mediaSource?: ValidationFunction<string>;
    stage?: ValidationFunction<string>;
    sex?: ValidationFunction<string>;
    condition?: ValidationFunction<string>;
    length?: ValidationFunction<number>;
    diskLength?: ValidationFunction<number>;
    width?: ValidationFunction<number>;
    depth?: ValidationFunction<number>;
    distance?: ValidationFunction<number>;
    temperature?: ValidationFunction<number>;
    latitude?: ValidationFunction<number>;
    longitude?: ValidationFunction<number>;
    description?: ValidationFunction<string>;
    comments?: ValidationFunction<string>;
    urlLinks?: ValidationFunction<string>;
    byUser?: ValidationFunction<string>;
    group?: ValidationFunction<string>;
    checkedByUser?: ValidationFunction<string>;
    substrate?: ValidationFunction<string>;
    weight?: ValidationFunction<number>;
    Media?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NewForm1OverridesProps = {
    NewForm1Grid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    timeName?: PrimitiveOverrideProps<SelectFieldProps>;
    reportType?: PrimitiveOverrideProps<TextFieldProps>;
    site?: PrimitiveOverrideProps<TextFieldProps>;
    country?: PrimitiveOverrideProps<TextFieldProps>;
    specieCommonName?: PrimitiveOverrideProps<TextFieldProps>;
    specie?: PrimitiveOverrideProps<TextFieldProps>;
    count?: PrimitiveOverrideProps<TextFieldProps>;
    reporter?: PrimitiveOverrideProps<TextFieldProps>;
    photographer?: PrimitiveOverrideProps<TextFieldProps>;
    mediaSource?: PrimitiveOverrideProps<TextFieldProps>;
    stage?: PrimitiveOverrideProps<SelectFieldProps>;
    sex?: PrimitiveOverrideProps<SelectFieldProps>;
    condition?: PrimitiveOverrideProps<SelectFieldProps>;
    length?: PrimitiveOverrideProps<TextFieldProps>;
    diskLength?: PrimitiveOverrideProps<TextFieldProps>;
    width?: PrimitiveOverrideProps<TextFieldProps>;
    depth?: PrimitiveOverrideProps<TextFieldProps>;
    distance?: PrimitiveOverrideProps<TextFieldProps>;
    temperature?: PrimitiveOverrideProps<TextFieldProps>;
    latitude?: PrimitiveOverrideProps<TextFieldProps>;
    longitude?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    comments?: PrimitiveOverrideProps<TextFieldProps>;
    urlLinks?: PrimitiveOverrideProps<TextFieldProps>;
    byUser?: PrimitiveOverrideProps<TextFieldProps>;
    group?: PrimitiveOverrideProps<TextFieldProps>;
    checkedByUser?: PrimitiveOverrideProps<TextFieldProps>;
    substrate?: PrimitiveOverrideProps<SelectFieldProps>;
    weight?: PrimitiveOverrideProps<TextFieldProps>;
    Media?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NewForm1Props = React.PropsWithChildren<{
    overrides?: NewForm1OverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NewForm1InputValues) => NewForm1InputValues;
    onSuccess?: (fields: NewForm1InputValues) => void;
    onError?: (fields: NewForm1InputValues, errorMessage: string) => void;
    onChange?: (fields: NewForm1InputValues) => NewForm1InputValues;
    onValidate?: NewForm1ValidationValues;
} & React.CSSProperties>;
export default function NewForm1(props: NewForm1Props): React.ReactElement;
