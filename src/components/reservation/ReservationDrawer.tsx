"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timeSlots, occasions } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import type { ReservationForm } from "@/types";

interface ReservationDrawerProps {
  open: boolean;
  onClose: () => void;
}

type Step = "when" | "who" | "confirm" | "success";

const emptyForm: ReservationForm = {
  date: "",
  time: "",
  covers: "2",
  occasion: "No special occasion",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dietary: "",
  notes: "",
};

/* ── shared input styles ─────────────────────────────────────────── */
const inputClass = "w-full bg-transparent outline-none transition-all duration-200";

const inputSx: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "15px",
  fontWeight: 300,
  color: "var(--color-ink)",
  borderBottom: "1px solid var(--color-border)",
  padding: "14px 0",
  display: "block",
  width: "100%",
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "var(--font-sans)",
      fontSize: "10px",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--color-ink-faint)",
      fontWeight: 400,
      marginBottom: "8px",
    }}>
      {children}
    </p>
  );
}

function Field({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: "36px" }}>{children}</div>;
}

export default function ReservationDrawer({ open, onClose }: ReservationDrawerProps) {
  const [step, setStep] = useState<Step>("when");
  const [form, setForm] = useState<ReservationForm>(emptyForm);
  const [focused, setFocused] = useState<string | null>(null);

  const set = (key: keyof ReservationForm, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  const reset = () => { setForm(emptyForm); setStep("when"); };
  const handleClose = () => { onClose(); setTimeout(reset, 600); };
  const handleSubmit = (e: FormEvent) => { e.preventDefault(); setStep("success"); };

  const canNextWhen = !!form.date && !!form.time;
  const canNextWho  = !!form.firstName && !!form.lastName && !!form.email && !!form.phone;

  const steps: Step[] = ["when", "who", "confirm"];
  const stepIdx = steps.indexOf(step as Exclude<Step,"success">);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim */}
          <motion.div
            className="fixed inset-0 z-[110]"
            style={{ background: "rgba(28,28,26,0.45)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-[120] flex flex-col w-full overflow-hidden"
            style={{
              maxWidth: "480px",
              background: "var(--color-cream)",
              borderLeft: "1px solid var(--color-border)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            aria-label="Reservation"
          >
            {/* ── Header ─────────────────────────────────────────── */}
            <div
              className="shrink-0 flex items-center justify-between"
              style={{
                height: "56px",
                borderBottom: "1px solid var(--color-border)",
                paddingLeft: "40px",
                paddingRight: "24px",
              }}
            >
              <span style={{
                fontFamily: "var(--font-serif)",
                fontSize: "18px",
                fontWeight: 500,
                color: "var(--color-ink)",
                letterSpacing: "0.04em",
              }}>
                {step === "success" ? "You're booked." : "Reserve a Table"}
              </span>

              <button
                onClick={handleClose}
                className="transition-opacity hover:opacity-40"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-faint)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label="Close"
              >
                Close ×
              </button>
            </div>

            {/* ── Step progress ───────────────────────────────────── */}
            {step !== "success" && (
              <div style={{ paddingLeft: "40px", paddingRight: "40px", paddingTop: "28px", paddingBottom: "4px" }}>
                <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
                  {steps.map((s, i) => (
                    <div
                      key={s}
                      style={{
                        height: "1px",
                        flex: 1,
                        background: i <= stepIdx ? "var(--color-ink)" : "var(--color-border-mid)",
                        transition: "background 0.4s ease",
                      }}
                    />
                  ))}
                </div>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-faint)",
                  fontWeight: 400,
                }}>
                  {step === "when"    && "Step 1 of 3 — Date & Time"}
                  {step === "who"     && "Step 2 of 3 — Your Details"}
                  {step === "confirm" && "Step 3 of 3 — Review & Confirm"}
                </p>
              </div>
            )}

            {/* ── Form body ───────────────────────────────────────── */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto"
              style={{ padding: "40px 40px 0" }}
            >
              <AnimatePresence mode="wait">

                {/* STEP 1 — WHEN */}
                {step === "when" && (
                  <motion.div
                    key="when"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Guests */}
                    <Field>
                      <FieldLabel>Number of Guests</FieldLabel>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
                        {[1,2,3,4,5,6,7,8].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => set("covers", String(n))}
                            style={{
                              width: "42px",
                              height: "42px",
                              border: `1px solid ${form.covers === String(n) ? "var(--color-ink)" : "var(--color-border)"}`,
                              background: form.covers === String(n) ? "var(--color-ink)" : "transparent",
                              color: form.covers === String(n) ? "var(--color-cream)" : "var(--color-ink-mid)",
                              fontFamily: "var(--font-sans)",
                              fontSize: "14px",
                              fontWeight: 400,
                              borderRadius: "2px",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                          >
                            {n}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => set("covers", "10+")}
                          style={{
                            padding: "0 14px",
                            height: "42px",
                            border: `1px solid ${form.covers === "10+" ? "var(--color-ink)" : "var(--color-border)"}`,
                            background: form.covers === "10+" ? "var(--color-ink)" : "transparent",
                            color: form.covers === "10+" ? "var(--color-cream)" : "var(--color-ink-mid)",
                            fontFamily: "var(--font-sans)",
                            fontSize: "12px",
                            fontWeight: 400,
                            borderRadius: "2px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          10+
                        </button>
                      </div>
                      {form.covers === "10+" && (
                        <p style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "12px",
                          fontWeight: 300,
                          color: "var(--color-gold)",
                          marginTop: "10px",
                        }}>
                          For large parties, please call 0121 714 0438.
                        </p>
                      )}
                    </Field>

                    {/* Date */}
                    <Field>
                      <FieldLabel>Date</FieldLabel>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => set("date", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                        className={inputClass}
                        style={{
                          ...inputSx,
                          borderBottomColor: focused === "date" ? "var(--color-ink)" : "var(--color-border)",
                          colorScheme: "light",
                        }}
                        onFocus={() => setFocused("date")}
                        onBlur={() => setFocused(null)}
                      />
                    </Field>

                    {/* Time */}
                    <Field>
                      <FieldLabel>Preferred Time</FieldLabel>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginTop: "4px" }}>
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => set("time", t)}
                            style={{
                              padding: "11px 0",
                              border: `1px solid ${form.time === t ? "var(--color-ink)" : "var(--color-border)"}`,
                              background: form.time === t ? "var(--color-ink)" : "transparent",
                              color: form.time === t ? "var(--color-cream)" : "var(--color-ink-mid)",
                              fontFamily: "var(--font-sans)",
                              fontSize: "12px",
                              fontWeight: 300,
                              borderRadius: "2px",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              letterSpacing: "0.04em",
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </Field>

                    {/* Occasion */}
                    <Field>
                      <FieldLabel>Occasion (optional)</FieldLabel>
                      <select
                        value={form.occasion}
                        onChange={(e) => set("occasion", e.target.value)}
                        className={inputClass}
                        style={{ ...inputSx, colorScheme: "light" }}
                      >
                        {occasions.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                  </motion.div>
                )}

                {/* STEP 2 — WHO */}
                {step === "who" && (
                  <motion.div
                    key="who"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                      <Field>
                        <FieldLabel>First Name</FieldLabel>
                        <input type="text" placeholder="James" value={form.firstName}
                          onChange={(e) => set("firstName", e.target.value)} required
                          className={inputClass}
                          style={{ ...inputSx, borderBottomColor: focused === "first" ? "var(--color-ink)" : "var(--color-border)" }}
                          onFocus={() => setFocused("first")} onBlur={() => setFocused(null)}
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Last Name</FieldLabel>
                        <input type="text" placeholder="Anderson" value={form.lastName}
                          onChange={(e) => set("lastName", e.target.value)} required
                          className={inputClass}
                          style={{ ...inputSx, borderBottomColor: focused === "last" ? "var(--color-ink)" : "var(--color-border)" }}
                          onFocus={() => setFocused("last")} onBlur={() => setFocused(null)}
                        />
                      </Field>
                    </div>

                    <Field>
                      <FieldLabel>Email Address</FieldLabel>
                      <input type="email" placeholder="james@example.com" value={form.email}
                        onChange={(e) => set("email", e.target.value)} required
                        className={inputClass}
                        style={{ ...inputSx, borderBottomColor: focused === "email" ? "var(--color-ink)" : "var(--color-border)" }}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      />
                    </Field>

                    <Field>
                      <FieldLabel>Phone Number</FieldLabel>
                      <input type="tel" placeholder="+44 7700 900000" value={form.phone}
                        onChange={(e) => set("phone", e.target.value)} required
                        className={inputClass}
                        style={{ ...inputSx, borderBottomColor: focused === "phone" ? "var(--color-ink)" : "var(--color-border)" }}
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                      />
                    </Field>

                    <Field>
                      <FieldLabel>Dietary Requirements (optional)</FieldLabel>
                      <input type="text" placeholder="e.g. Gluten-free, nut allergy" value={form.dietary}
                        onChange={(e) => set("dietary", e.target.value)}
                        className={inputClass}
                        style={{ ...inputSx, borderBottomColor: focused === "diet" ? "var(--color-ink)" : "var(--color-border)" }}
                        onFocus={() => setFocused("diet")} onBlur={() => setFocused(null)}
                      />
                    </Field>

                    <Field>
                      <FieldLabel>Special Requests (optional)</FieldLabel>
                      <textarea placeholder="Celebration message, preferred seating..." value={form.notes}
                        onChange={(e) => set("notes", e.target.value)} rows={3}
                        className={`${inputClass} resize-none`}
                        style={{ ...inputSx, borderBottomColor: focused === "notes" ? "var(--color-ink)" : "var(--color-border)" }}
                        onFocus={() => setFocused("notes")} onBlur={() => setFocused(null)}
                      />
                    </Field>
                  </motion.div>
                )}

                {/* STEP 3 — CONFIRM */}
                {step === "confirm" && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Summary card */}
                    <div style={{
                      background: "var(--color-cream-2)",
                      border: "1px solid var(--color-border)",
                      padding: "32px",
                      marginBottom: "32px",
                    }}>
                      {[
                        { label: "Date",     value: formatDate(form.date) },
                        { label: "Time",     value: form.time },
                        { label: "Guests",   value: `${form.covers} ${Number(form.covers) === 1 ? "cover" : "covers"}` },
                        { label: "Occasion", value: form.occasion },
                        { label: "Name",     value: `${form.firstName} ${form.lastName}` },
                        { label: "Email",    value: form.email },
                        { label: "Phone",    value: form.phone },
                        ...(form.dietary ? [{ label: "Dietary", value: form.dietary }] : []),
                        ...(form.notes   ? [{ label: "Notes",   value: form.notes   }] : []),
                      ].map((row, i) => (
                        <div
                          key={row.label}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            gap: "16px",
                            paddingTop: i === 0 ? 0 : "16px",
                            paddingBottom: "16px",
                            borderBottom: "1px solid var(--color-border)",
                          }}
                        >
                          <span style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "10px",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--color-ink-faint)",
                            fontWeight: 400,
                            flexShrink: 0,
                          }}>
                            {row.label}
                          </span>
                          <span style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "14px",
                            fontWeight: 300,
                            color: "var(--color-ink)",
                            textAlign: "right",
                          }}>
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "var(--color-ink-faint)",
                      lineHeight: 1.8,
                    }}>
                      By confirming, you agree to our cancellation policy. We kindly ask for 24 hours&apos; notice should you need to cancel or amend.
                    </p>
                  </motion.div>
                )}

                {/* SUCCESS */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: "48px" }}
                  >
                    {/* Check mark */}
                    <div style={{
                      width: "56px",
                      height: "56px",
                      border: "1px solid var(--color-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "32px",
                    }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M3 10l5 5 9-9" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    <h3 style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(28px, 4vw, 36px)",
                      fontWeight: 400,
                      color: "var(--color-ink)",
                      letterSpacing: "-0.01em",
                      marginBottom: "16px",
                    }}>
                      Reservation Confirmed
                    </h3>

                    <p style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "var(--color-ink-mid)",
                      lineHeight: 1.85,
                      maxWidth: "300px",
                      marginBottom: "40px",
                    }}>
                      We look forward to welcoming you, {form.firstName}. A confirmation has been sent to {form.email}.
                    </p>

                    {/* Booking summary */}
                    <div style={{
                      width: "100%",
                      background: "var(--color-cream-2)",
                      border: "1px solid var(--color-border)",
                      padding: "28px 32px",
                      marginBottom: "40px",
                      textAlign: "left",
                    }}>
                      <p style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "22px",
                        fontWeight: 400,
                        color: "var(--color-ink)",
                        marginBottom: "8px",
                      }}>
                        {formatDate(form.date)}
                      </p>
                      <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "12px",
                        fontWeight: 300,
                        color: "var(--color-ink-faint)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}>
                        {form.time} · {form.covers} {Number(form.covers) === 1 ? "Cover" : "Covers"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="transition-opacity hover:opacity-50"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--color-ink-faint)",
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Close
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </form>

            {/* ── Footer actions ──────────────────────────────────── */}
            {step !== "success" && (
              <div
                className="shrink-0 flex justify-between items-center"
                style={{
                  borderTop: "1px solid var(--color-border)",
                  padding: "20px 40px",
                  marginTop: "auto",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (step === "who")     setStep("when");
                    if (step === "confirm") setStep("who");
                  }}
                  className="transition-opacity hover:opacity-40"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-faint)",
                    visibility: step === "when" ? "hidden" : "visible",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  ← Back
                </button>

                {step === "confirm" ? (
                  <button
                    type="button"
                    onClick={handleSubmit as unknown as React.MouseEventHandler}
                    style={{
                      background: "var(--color-ink)",
                      color: "var(--color-cream)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontWeight: 400,
                      padding: "12px 28px",
                      borderRadius: "2px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Confirm Reservation →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === "when" && canNextWhen) setStep("who");
                      if (step === "who"  && canNextWho)  setStep("confirm");
                    }}
                    disabled={step === "when" ? !canNextWhen : !canNextWho}
                    style={{
                      background: "var(--color-ink)",
                      color: "var(--color-cream)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontWeight: 400,
                      padding: "12px 28px",
                      borderRadius: "2px",
                      border: "none",
                      cursor: "pointer",
                      opacity: (step === "when" ? canNextWhen : canNextWho) ? 1 : 0.3,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    Continue →
                  </button>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
