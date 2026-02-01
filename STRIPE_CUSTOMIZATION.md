# Customizing Your Stripe Checkout Page

## What You Can Customize

The Stripe Checkout page can be customized to match your wedding theme!

## Quick Customization (In Stripe Dashboard)

### 1. Go to Branding Settings
Visit: https://dashboard.stripe.com/settings/branding

### 2. Customize These Elements:

#### Business Name
- Current: "NJ Wedding"
- Change to: "Natalie & James" or "N&J Wedding Fund"

#### Brand Color
- Set to your wedding colors:
  - Dusty Rose: `#D4A5A5`
  - Sage: `#B5C4B1`
  - Dusty Blue: `#8BA8B8`

#### Logo/Icon (Recommended!)
1. Upload a small image (512x512px recommended)
2. Options:
   - Your engagement photo
   - Wedding rings icon
   - Your initials (N&J)
   - Simple heart icon

#### Accent Color
- This colors the "Pay" button and highlights
- Suggestion: Use Dusty Blue (`#8BA8B8`) or Sage (`#B5C4B1`)

## What's Already Customized in Code

✅ **Custom message** below the Pay button:
- "Thank you for your generous contribution to our honeymoon! 💕"

✅ **Product image**: 
- Your watercolour image will show on the checkout page
- To change it, replace `watercolour.png` in the `/public` folder

## Advanced: Full Custom UI (Option 2)

If you want complete control over the payment page design, you'd need to:

1. Build a custom form on your website
2. Use Stripe Payment Element
3. Requires more development work
4. Not recommended unless you want very specific styling

**Current approach (Stripe Checkout) is recommended** - it's:
- Secure
- Mobile-optimized  
- PCI compliant
- Trusted by users
- Fast to implement

## Step-by-Step: Customize Now

### Immediate Actions:

1. **Update Business Name**
   - Go to: https://dashboard.stripe.com/settings/branding
   - Change "NJ Wedding" to "Natalie & James Wedding"

2. **Set Brand Color**
   - Use: `#D4A5A5` (Dusty Rose) for a soft, romantic look
   - Or: `#8BA8B8` (Dusty Blue) for a calmer feel

3. **Upload a Logo** (Optional but recommended)
   - Create or find a 512x512px image
   - Simple options:
     - Watercolour ring design
     - Your initials in an elegant font
     - Heart icon matching your wedding colors

4. **Test It**
   - Make a test contribution to see the changes
   - Use test card: 4242 4242 4242 4242

## Product Image Tips

The image shown on checkout comes from:
```
/public/watercolour.png
```

To use a different image:
1. Add your image to `/public/` folder
2. Name it something like `wedding-logo.png`
3. Update the code (I can help with this)

## Color Palette Reference

Your wedding colors (for easy copy-paste):
- **Dusty Rose**: `#D4A5A5`
- **Sage**: `#B5C4B1`
- **Dusty Blue**: `#8BA8B8`
- **Blush**: `#E8C4C4`
- **Eucalyptus**: `#9DB4A0`

## Before & After

### Before Customization:
- Generic "NJ Wedding" name
- Default blue Stripe colors
- No logo

### After Customization:
- "Natalie & James Wedding" or custom name
- Wedding color scheme (dusty rose/blue/sage)
- Optional: Your photo or logo
- Custom thank you message

## Need Help?

The code changes are already done! Just:
1. Visit Stripe Dashboard branding settings
2. Update the settings above
3. Test with a contribution

That's it! 🎨
