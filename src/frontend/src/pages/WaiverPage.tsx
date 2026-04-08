import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, FileText } from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { Child } from "../backend";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ScrollArea } from "../components/ui/scroll-area";
import { useSubmitWaiver } from "../hooks/useQueries";

const WAIVER_TERMS = `COMPREHENSIVE LIABILITY WAIVER AND PHOTO RELEASE

By signing this waiver, I, the undersigned parent or legal guardian, acknowledge and agree to the following terms and conditions for my child(ren) to participate in activities at KIDS Indoor Play & Event located at 1624 W I-240 Service Rd, Oklahoma City, OK 73159.

1. ASSUMPTION OF RISK
I understand and acknowledge that participation in indoor play activities involves inherent risks, including but not limited to: physical injury, falls, collisions with other participants or equipment, sprains, strains, fractures, and other injuries that may result from active play. I voluntarily assume all risks associated with my child's participation in these activities.

2. RELEASE OF LIABILITY
I hereby release, waive, discharge, and covenant not to sue KIDS Indoor Play & Event, its owners, operators, employees, agents, volunteers, and representatives (collectively "Released Parties") from any and all liability, claims, demands, actions, and causes of action whatsoever arising out of or related to any loss, damage, or injury, including death, that may be sustained by my child or me while participating in activities at the facility, whether caused by the negligence of the Released Parties or otherwise.

3. MEDICAL TREATMENT
I authorize KIDS Indoor Play & Event staff to seek emergency medical treatment for my child if necessary. I agree to be financially responsible for any medical expenses incurred as a result of such treatment. I understand that the facility does not provide medical insurance coverage for participants.

4. SUPERVISION RESPONSIBILITY
I understand that I am responsible for supervising my child at all times during their visit to KIDS Indoor Play & Event. I agree to remain on the premises while my child is playing and to ensure my child follows all facility rules and staff instructions.

5. PHOTO AND VIDEO RELEASE
I hereby grant KIDS Indoor Play & Event, its representatives, employees, and agents the irrevocable right and permission to photograph, videotape, or otherwise record my child's image, likeness, voice, and participation in activities at the facility. I authorize KIDS Indoor Play & Event to use, reproduce, publish, and distribute such photographs, videos, and recordings in any media format, including but not limited to: social media platforms, website content, promotional materials, advertisements, brochures, and marketing campaigns, without compensation to me or my child. I waive any right to inspect or approve the finished product or the use to which it may be applied. I release KIDS Indoor Play & Event from any claims arising from such use.

6. FACILITY RULES AND POLICIES
I agree to comply with all posted rules, regulations, and policies of KIDS Indoor Play & Event, including but not limited to:
- Grip socks are required for all children (available for purchase at $2/pair + Tax)
- Children must be between 6 months and 10 years of age
- Adult supervision is mandatory at all times
- Food and beverages are permitted only in designated areas
- Proper behavior and respect for other guests and staff is required

7. INDEMNIFICATION
I agree to indemnify and hold harmless the Released Parties from any loss, liability, damage, or costs, including attorney fees, that may arise from my child's participation in activities at KIDS Indoor Play & Event.

8. SEVERABILITY
I understand that if any portion of this waiver is found to be void or unenforceable, the remaining portions shall remain in full force and effect.

9. ACKNOWLEDGMENT OF UNDERSTANDING
I have read this waiver carefully and fully understand its contents. I am aware that this is a release of liability and a contract between myself and KIDS Indoor Play & Event. I sign this waiver voluntarily and with full knowledge of its significance.

By checking the agreement box below and submitting this form, I acknowledge that I have read, understood, and agree to be bound by all terms and conditions set forth in this Comprehensive Liability Waiver and Photo Release.`;

export default function WaiverPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    children: Array(6).fill({ name: "", birthday: "" }),
    agreeUnifiedTerms: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const submitWaiverMutation = useSubmitWaiver();

  const handleChildChange = (
    index: number,
    field: "name" | "birthday",
    value: string,
  ) => {
    const newChildren = [...formData.children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    setFormData({ ...formData, children: newChildren });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const childrenWithNames = formData.children
      .filter((child) => child.name.trim() !== "")
      .map((child) => ({
        name: child.name,
        birthday: child.birthday || undefined,
      }));

    if (childrenWithNames.length === 0) {
      alert("Please enter at least one child's name");
      return;
    }

    if (!formData.agreeUnifiedTerms) {
      alert("Please agree to the liability waiver and photo release terms");
      return;
    }

    try {
      await submitWaiverMutation.mutateAsync({
        parentName: formData.parentName,
        parentEmail: formData.parentEmail,
        parentPhone: formData.parentPhone,
        children: childrenWithNames as Child[],
        agreeUnifiedTerms: formData.agreeUnifiedTerms,
        termsAndConditions: WAIVER_TERMS,
      });
      setSubmitted(true);
      setFormData({
        parentName: "",
        parentEmail: "",
        parentPhone: "",
        children: Array(6).fill({ name: "", birthday: "" }),
        agreeUnifiedTerms: false,
      });
    } catch (error) {
      console.error("Error submitting waiver:", error);
      alert("Failed to submit waiver. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: "/" })}
          className="mb-4 sm:mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-6 sm:p-8 text-center">
            <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-3 sm:mb-4" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              Liability Waiver & Photo Release
            </h1>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg">
              Required for all children before play
            </p>
          </div>

          <div className="p-4 sm:p-8 lg:p-12">
            {submitted ? (
              <div className="text-center py-8 sm:py-12">
                <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-600 mx-auto mb-4 sm:mb-6" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Waiver Submitted Successfully!
                </h2>
                <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 px-4">
                  Thank you for signing the waiver. You're all set to visit us!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 sm:h-auto"
                  >
                    Sign Another Waiver
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate({ to: "/" })}
                    className="h-12 sm:h-auto"
                  >
                    Return to Home
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Parent/Guardian Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="parentName"
                        className="text-sm sm:text-base"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="parentName"
                        required
                        value={formData.parentName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            parentName: e.target.value,
                          })
                        }
                        className="mt-2 h-11 sm:h-12 text-sm sm:text-base"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="parentEmail"
                        className="text-sm sm:text-base"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="parentEmail"
                        type="email"
                        required
                        value={formData.parentEmail}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            parentEmail: e.target.value,
                          })
                        }
                        className="mt-2 h-11 sm:h-12 text-sm sm:text-base"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="parentPhone"
                        className="text-sm sm:text-base"
                      >
                        Phone Number *
                      </Label>
                      <Input
                        id="parentPhone"
                        type="tel"
                        required
                        value={formData.parentPhone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            parentPhone: e.target.value,
                          })
                        }
                        className="mt-2 h-11 sm:h-12 text-sm sm:text-base"
                        placeholder="(405) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 sm:pt-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Children Information
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    Enter information for up to 6 children (at least one
                    required)
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    {formData.children.map((child, index) => (
                      <div
                        key={`waiver-child-${child.name || index}`}
                        className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200"
                      >
                        <p className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
                          Child {index + 1}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <Label
                              htmlFor={`childName${index}`}
                              className="text-xs sm:text-sm"
                            >
                              Child's Full Name
                            </Label>
                            <Input
                              id={`childName${index}`}
                              value={child.name}
                              onChange={(e) =>
                                handleChildChange(index, "name", e.target.value)
                              }
                              placeholder="Enter child's name"
                              className="mt-2 h-10 sm:h-11 text-sm sm:text-base"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor={`childBirthday${index}`}
                              className="text-xs sm:text-sm"
                            >
                              Birthday (Optional)
                            </Label>
                            <Input
                              id={`childBirthday${index}`}
                              type="date"
                              value={child.birthday}
                              onChange={(e) =>
                                handleChildChange(
                                  index,
                                  "birthday",
                                  e.target.value,
                                )
                              }
                              className="mt-2 h-10 sm:h-11 text-sm sm:text-base"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6 sm:pt-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Terms and Conditions
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                    Please read the following terms carefully before agreeing
                  </p>
                  <ScrollArea className="h-64 sm:h-80 rounded-lg sm:rounded-xl border-2 border-gray-300 p-4 sm:p-6 bg-gray-50">
                    <div className="text-xs sm:text-sm text-gray-800 whitespace-pre-wrap leading-relaxed font-mono">
                      {WAIVER_TERMS}
                    </div>
                  </ScrollArea>
                </div>

                <div className="border-t pt-6 sm:pt-8">
                  <div className="bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-blue-200">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <Checkbox
                        id="agreeUnifiedTerms"
                        checked={formData.agreeUnifiedTerms}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            agreeUnifiedTerms: checked as boolean,
                          })
                        }
                        className="mt-1"
                      />
                      <Label
                        htmlFor="agreeUnifiedTerms"
                        className="text-sm sm:text-base leading-relaxed cursor-pointer"
                      >
                        <strong className="text-gray-900">
                          I agree to the Liability Waiver and Photo Release:
                        </strong>
                        <span className="text-gray-700">
                          {" "}
                          I have read and understand the comprehensive liability
                          waiver and photo release above. I acknowledge the
                          risks involved, agree to release KIDS Indoor Play &
                          Event from all liability, agree to supervise my
                          children at all times, and authorize the use of
                          photographs and videos of my child(ren) for
                          promotional purposes.
                        </span>
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={submitWaiverMutation.isPending}
                    className="flex-1 h-12 sm:h-14 text-base sm:text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  >
                    {submitWaiverMutation.isPending
                      ? "Submitting..."
                      : "Submit Waiver"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate({ to: "/" })}
                    className="h-12 sm:h-14 text-base sm:text-lg"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
