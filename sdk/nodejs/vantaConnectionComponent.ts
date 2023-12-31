// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "./utilities";

export class VantaConnectionComponent extends pulumi.ComponentResource {
    /** @internal */
    public static readonly __pulumiType = 'vanta:index:VantaConnectionComponent';

    /**
     * Returns true if the given object is an instance of VantaConnectionComponent.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is VantaConnectionComponent {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === VantaConnectionComponent.__pulumiType;
    }

    /**
     * The ARN of the Vanta auditor role. You will copy the Role ARN from AWS, and paste it into Vanta.
     */
    public /*out*/ readonly vantaAuditorArn!: pulumi.Output<string>;

    /**
     * Create a VantaConnectionComponent resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args: VantaConnectionComponentArgs, opts?: pulumi.ComponentResourceOptions) {
        let resourceInputs: pulumi.Inputs = {};
        opts = opts || {};
        if (!opts.id) {
            if ((!args || args.accountId === undefined) && !opts.urn) {
                throw new Error("Missing required property 'accountId'");
            }
            if ((!args || args.externalId === undefined) && !opts.urn) {
                throw new Error("Missing required property 'externalId'");
            }
            resourceInputs["accountId"] = args ? args.accountId : undefined;
            resourceInputs["externalId"] = args ? args.externalId : undefined;
            resourceInputs["vantaAuditorArn"] = undefined /*out*/;
        } else {
            resourceInputs["vantaAuditorArn"] = undefined /*out*/;
        }
        opts = pulumi.mergeOptions(utilities.resourceOptsDefaults(), opts);
        super(VantaConnectionComponent.__pulumiType, name, resourceInputs, opts, true /*remote*/);
    }
}

/**
 * The set of arguments for constructing a VantaConnectionComponent resource.
 */
export interface VantaConnectionComponentArgs {
    /**
     * Provided by Vanta. The AWS account ID.
     */
    accountId: pulumi.Input<string>;
    /**
     * Provided by Vanta. The external ID.
     */
    externalId: pulumi.Input<string>;
}
