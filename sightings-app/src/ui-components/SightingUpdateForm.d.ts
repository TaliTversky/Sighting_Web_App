/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type SightingUpdateFormInputValues = {
    date?: string;
    time?: string;
    speciesCommonName?: string;
    speciesScienceName?: string;
    site?: string;
    latitude?: number;
    longitude?: number;
    count?: number;
    stage?: string;
    sex?: string;
    condition?: string;
};
export declare type SightingUpdateFormValidationValues = {
    date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    speciesCommonName?: ValidationFunction<string>;
    speciesScienceName?: ValidationFunction<string>;
    site?: ValidationFunction<string>;
    latitude?: ValidationFunction<number>;
    longitude?: ValidationFunction<number>;
    count?: ValidationFunction<number>;
    stage?: ValidationFunction<string>;
    sex?: ValidationFunction<string>;
    condition?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SightingUpdateFormOverridesProps = {
    SightingUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    speciesCommonName?: PrimitiveOverrideProps<TextFieldProps>;
    speciesScienceName?: PrimitiveOverrideProps<TextFieldProps>;
    site?: PrimitiveOverrideProps<TextFieldProps>;
    latitude?: PrimitiveOverrideProps<TextFieldProps>;
    longitude?: PrimitiveOverrideProps<TextFieldProps>;
    count?: PrimitiveOverrideProps<TextFieldProps>;
    stage?: PrimitiveOverrideProps<TextFieldProps>;
    sex?: PrimitiveOverrideProps<TextFieldProps>;
    condition?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SightingUpdateFormProps = React.PropsWithChildren<{
    overrides?: SightingUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sighting?: any;
    onSubmit?: (fields: SightingUpdateFormInputValues) => SightingUpdateFormInputValues;
    onSuccess?: (fields: SightingUpdateFormInputValues) => void;
    onError?: (fields: SightingUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SightingUpdateFormInputValues) => SightingUpdateFormInputValues;
    onValidate?: SightingUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SightingUpdateForm(props: SightingUpdateFormProps): React.ReactElement;
