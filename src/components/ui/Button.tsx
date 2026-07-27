"use client";

import { cn } from "@/lib/utils";
import { play } from "cuelume";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "chip"
  | "destructive"
  | "link";

type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconOnly?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  soundOnHover?: "tick" | false;
  soundOnPress?: "press" | "chime" | "release" | false;
  ariaLabel?: string;
  className?: string;
  children?: ReactNode;
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      keyof ButtonBaseProps | "aria-label"
    > {
  href?: never;
  external?: never;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  external?: boolean;
  type?: never;
  disabled?: never;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
  "aria-current"?:
    | boolean
    | "page"
    | "step"
    | "location"
    | "date"
    | "time"
    | "true"
    | "false";
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const sizeStyles: Record<
  ButtonSize,
  {
    height: string;
    padX: string;
    padXWithIcon: string;
    iconOnlySquare: string;
    text: string;
    gap: string;
    radius: string;
    iconSize: string;
  }
> = {
  xs: {
    height: "h-7",
    padX: "px-2.5",
    padXWithIcon: "pl-2 pr-2.5",
    iconOnlySquare: "h-7 w-7",
    text: "text-[12px] leading-[16px]",
    gap: "gap-1.5",
    radius: "rounded-[8px]",
    iconSize: "h-3 w-3",
  },
  sm: {
    height: "h-8",
    padX: "px-3",
    padXWithIcon: "pl-2.5 pr-3",
    iconOnlySquare: "h-8 w-8",
    text: "text-[13px] leading-[18px]",
    gap: "gap-1.5",
    radius: "rounded-[10px]",
    iconSize: "h-3.5 w-3.5",
  },
  md: {
    height: "h-10",
    padX: "px-4",
    padXWithIcon: "pl-3 pr-4",
    iconOnlySquare: "h-10 w-10",
    text: "text-[14px] leading-[20px]",
    gap: "gap-2",
    radius: "rounded-[12px]",
    iconSize: "h-4 w-4",
  },
  lg: {
    height: "h-12",
    padX: "px-5",
    padXWithIcon: "pl-4 pr-5",
    iconOnlySquare: "h-12 w-12",
    text: "text-[15px] leading-[22px]",
    gap: "gap-2",
    radius: "rounded-[14px]",
    iconSize: "h-4 w-4",
  },
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-primary text-primary-foreground shadow-sm",
    "hover:bg-primary/90",
    "active:bg-primary/85",
    "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-40 disabled:hover:bg-primary"
  ),
  secondary: cn(
    "bg-card text-foreground border border-border/60 shadow-sm",
    "hover:border-primary/40 hover:bg-primary/[0.04]",
    "active:bg-primary/[0.08]",
    "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-40 disabled:hover:bg-card disabled:hover:border-border/60"
  ),
  ghost: cn(
    "bg-transparent text-muted-foreground",
    "hover:bg-secondary/60 hover:text-foreground",
    "active:bg-secondary/80",
    "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
  ),
  outline: cn(
    "bg-transparent text-foreground border border-border/60",
    "hover:border-primary/40 hover:bg-primary/[0.04]",
    "active:bg-primary/[0.08]",
    "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-border/60"
  ),
  chip: cn(
    "bg-secondary/40 text-muted-foreground border border-border/60 font-mono uppercase tracking-[0.12em]",
    "hover:border-primary/30 hover:bg-primary/[0.04] hover:text-foreground",
    "active:bg-primary/[0.08]",
    "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-40 disabled:hover:bg-secondary/40 disabled:hover:text-muted-foreground disabled:hover:border-border/60"
  ),
  destructive: cn(
    "bg-destructive text-destructive-foreground shadow-sm",
    "hover:bg-destructive/90",
    "active:bg-destructive/85",
    "focus-visible:ring-2 focus-visible:ring-destructive/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-40 disabled:hover:bg-destructive"
  ),
  link: cn(
    "bg-transparent text-muted-foreground",
    "hover:text-foreground",
    "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-[6px]",
    "disabled:opacity-40 disabled:hover:text-muted-foreground"
  ),
};

const baseStyles = cn(
  "group/btn relative inline-flex shrink-0 items-center justify-center whitespace-nowrap font-semibold",
  "select-none outline-none",
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out",
  "motion-reduce:transition-none"
);

const nonLinkStyles = cn(
  "active:scale-[0.98] motion-reduce:active:scale-100",
  "disabled:cursor-not-allowed disabled:active:scale-100"
);

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = "primary",
    size = "md",
    iconLeft,
    iconRight,
    iconOnly,
    isLoading = false,
    fullWidth = false,
    soundOnHover = "tick",
    soundOnPress = "press",
    ariaLabel,
    className,
    children,
    ...rest
  } = props;

  const sizes = sizeStyles[size];
  const hasIconLeft = !!iconLeft;
  const hasIconRight = !!iconRight;
  const isIconOnly = !!iconOnly && !children;
  const isLinkVariant = variant === "link";

  const layoutClasses = cn(
    baseStyles,
    variantStyles[variant],
    isLinkVariant ? "h-auto" : sizes.height,
    sizes.text,
    sizes.gap,
    !isLinkVariant && sizes.radius,
    !isLinkVariant && nonLinkStyles,
    !isLinkVariant &&
      (isIconOnly
        ? sizes.iconOnlySquare
        : hasIconLeft || hasIconRight
          ? sizes.padXWithIcon
          : sizes.padX),
    fullWidth && "w-full",
    isLoading && "cursor-wait",
    className
  );

  const contentNode = (
    <>
      {isLoading ? (
        <Loader2
          className={cn(
            sizes.iconSize,
            "shrink-0 animate-spin motion-reduce:animate-none"
          )}
          strokeWidth={2.25}
          aria-hidden="true"
        />
      ) : isIconOnly ? (
        <span
          className={cn(
            sizes.iconSize,
            "shrink-0 [&>svg]:h-full [&>svg]:w-full"
          )}
          aria-hidden="true"
        >
          {iconOnly}
        </span>
      ) : (
        <>
          {iconLeft && (
            <span
              className={cn(
                sizes.iconSize,
                "shrink-0 [&>svg]:h-full [&>svg]:w-full"
              )}
              aria-hidden="true"
            >
              {iconLeft}
            </span>
          )}
          {children}
          {iconRight && (
            <span
              className={cn(
                sizes.iconSize,
                "shrink-0 [&>svg]:h-full [&>svg]:w-full"
              )}
              aria-hidden="true"
            >
              {iconRight}
            </span>
          )}
        </>
      )}
    </>
  );

  const dataAttrs: Record<string, string> = {};
  if (soundOnHover) dataAttrs["data-cuelume-hover"] = soundOnHover;
  if (soundOnPress) dataAttrs["data-cuelume-press"] = soundOnPress;

  if ("href" in props && props.href !== undefined) {
    const {
      href,
      external,
      onClick,
      target: propTarget,
      rel: propRel,
      "aria-current": ariaCurrent,
    } = props as ButtonAsLinkProps;

    const isExternal =
      external ??
      (href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:"));

    const target = propTarget ?? (isExternal ? "_blank" : undefined);
    const rel = propRel ?? (isExternal ? "noopener noreferrer" : undefined);

    const resolvedAriaLabel =
      ariaLabel ?? (isIconOnly ? "button" : undefined);

    if (isExternal) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          aria-label={resolvedAriaLabel}
          aria-current={ariaCurrent}
          onClick={(e) => {
            if (soundOnPress) play(soundOnPress);
            onClick?.(e);
          }}
          className={layoutClasses}
          {...dataAttrs}
        >
          {contentNode}
        </a>
      );
    }

    return (
      <InternalLinkButton
        href={href}
        ariaLabel={resolvedAriaLabel}
        ariaCurrent={ariaCurrent}
        onClick={onClick}
        soundOnPress={soundOnPress}
        layoutClasses={layoutClasses}
        dataAttrs={dataAttrs}
        forwardedRef={ref as React.Ref<HTMLAnchorElement>}
      >
        {contentNode}
      </InternalLinkButton>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  const inheritedAriaLabel = (buttonProps as { "aria-label"?: string })[
    "aria-label"
  ];

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      {...buttonProps}
      type={buttonProps.type ?? "button"}
      disabled={buttonProps.disabled || isLoading}
      aria-label={
        ariaLabel ?? inheritedAriaLabel ?? (isIconOnly ? "button" : undefined)
      }
      aria-busy={isLoading || undefined}
      onClick={(e) => {
        if (soundOnPress && !buttonProps.disabled && !isLoading) {
          play(soundOnPress);
        }
        buttonProps.onClick?.(e);
      }}
      className={layoutClasses}
      {...dataAttrs}
    >
      {contentNode}
    </button>
  );
});

function InternalLinkButton({
  href,
  ariaLabel,
  ariaCurrent,
  onClick,
  soundOnPress,
  layoutClasses,
  dataAttrs,
  forwardedRef,
  children,
}: {
  href: string;
  ariaLabel?: string;
  ariaCurrent?:
    | boolean
    | "page"
    | "step"
    | "location"
    | "date"
    | "time"
    | "true"
    | "false";
  onClick?: (e: React.MouseEvent) => void;
  soundOnPress: "press" | "chime" | "release" | false;
  layoutClasses: string;
  dataAttrs: Record<string, string>;
  forwardedRef: React.Ref<HTMLAnchorElement>;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <Link
      ref={forwardedRef}
      href={href}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      onClick={(e) => {
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey
        ) {
          return;
        }
        e.preventDefault();
        if (soundOnPress) play(soundOnPress);
        onClick?.(e);
        router.push(href);
      }}
      className={layoutClasses}
      {...dataAttrs}
    >
      {children}
    </Link>
  );
}