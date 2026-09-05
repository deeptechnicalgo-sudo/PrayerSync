import Script from "next/script"
export default function AdScript() {
    return (
        <>
            <Script
                id="hilltop-banner"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
      (function(bso){
        var d = document,
            s = d.createElement('script'),
            l = d.scripts[d.scripts.length - 1];
        s.settings = bso || {};
        s.src = "//conventionalresponse.com/bpX/VBs.dGGvlr0FYHWbcp/ceLmq9eu/ZqUyljk-P/TYcTznOADocox/NYDFkXtTNyzmM/4hN/z/EY1BMLwb";
        s.async = true;
        s.referrerPolicy = 'no-referrer-when-downgrade';
        l.parentNode.insertBefore(s, l);
      })({});
    `,
                }}
            />
        </>
    )
}